import express, { json, urlencoded } from "express";
import cors from "cors";
import { addApiRoutes } from "./api/routes";
import helmet from "helmet";

function buildApp(): express.Application {
  
  const app = express();

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(cors());
  app.use(helmet());
  
  addApiRoutes(app);

  return app;
}

export default buildApp();
