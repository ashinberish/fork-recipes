import { contract } from "@/contracts";
import { createExpressEndpoints, initServer } from "@ts-rest/express";
import { Application, IRouter } from "express";
import { ZodIssue } from "zod";
import users from "./users";
import Logger from "@/utils/logger";
import { ForkRecipesResponse } from "@/utils/fork-recipes-response";
import { ForkRecipesValidationError } from "@/contracts/schemas/api";
import { generateOpenApi } from "@ts-rest/open-api";
import * as swaggerUi from "swagger-ui-express";
import { formatDuration } from "@/utils/misc";

const APP_START_TIME = Date.now();

const s = initServer();
const router = s.router(contract, {
  users,
});

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Fork Recipes API",
    version: "1.0.0",
  },
});

export function addApiRoutes(app: Application): void {
  applyTsRestApiRoutes(app);

  app.use("/", (req, res) => {
    res.status(200).json(
      new ForkRecipesResponse("ok", {
        uptime: formatDuration(Date.now() - APP_START_TIME),
        version: "pre_release v1.0.0", // TODO: get from config
      })
    );
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
  app.use((req, res) => {
    res
      .status(404)
      .json(
        new ForkRecipesResponse(
          `Unknown request URL (${req.method}: ${req.path})`,
          null
        )
      );
  });
}

function applyTsRestApiRoutes(app: IRouter): void {
  createExpressEndpoints(contract, router, app, {
    jsonQuery: true,
    requestValidationErrorHandler(err, req, res, _next) {
      let message: string | undefined = undefined;
      let validationErrors: string[] | undefined = undefined;
      console.log(err);
      if (err.pathParams?.issues !== undefined) {
        message = "Invalid path parameter schema";
        validationErrors = err.pathParams.issues.map(prettyErrorMessage);
      } else if (err.query?.issues !== undefined) {
        message = "Invalid query schema";
        validationErrors = err.query.issues.map(prettyErrorMessage);
      } else if (err.body?.issues !== undefined) {
        message = "Invalid request data schema";
        validationErrors = err.body.issues.map(prettyErrorMessage);
      } else if (err.headers?.issues !== undefined) {
        message = "Invalid header schema";
        validationErrors = err.headers.issues.map(prettyErrorMessage);
      } else {
        Logger.error(
          `Unknown validation error for ${req.method} ${
            req.path
          }: ${JSON.stringify(err)}`
        );
        res
          .status(500)
          .json({ message: "Unknown validation error. Contact support." });
        return;
      }

      res
        .status(422)
        .json({ message, validationErrors } as ForkRecipesValidationError);
    },
    globalMiddleware: [
      // authenticateTsRestRequest(),
      // rateLimitRequest(),
      // verifyRequiredConfiguration(),
      // verifyPermissions(),
    ],
  });
}

function prettyErrorMessage(issue: ZodIssue | undefined): string {
  if (issue === undefined) return "";
  const path = issue.path.length > 0 ? `"${issue.path.join(".")}" ` : "";
  return `${path}${issue.message}`;
}
