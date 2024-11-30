import { ForkRecipesResponseSchema, meta, responseWithData } from "@/contracts/schemas/api";
import { UserSchema } from "@/contracts/schemas/users";
import { initContract } from "@ts-rest/core"
import { z } from "zod";

const c = initContract();

export const UserNameSchema = z
    .string()
    .min(1)
    .max(16)
    .regex(
        /^[\da-zA-Z_-]+$/,
        "Can only contain lower/uppercase letters, underscare and minus."
    );

export const CheckUsernamePathParametersSchema = z.object({
    username: UserNameSchema,
});

export type CheckUsernamePathParameters = z.infer<
  typeof CheckUsernamePathParametersSchema
>;

export const usersContact = c.router({
    // get: {
    //     summary: "Get user",
    //     description: "Get a user's data.",
    //     method: "GET",
    //     path: "",
    //     responses: {
    //         200: responseWithData(UserSchema)
    //     },
    //     metadata: meta({
    //         rateLimit: "userGet"
    //     })
    // }, // TODO
    checkUsernameAvailable: {
        summary: "Check username available",
        description: "Checks to see if a username is available",
        method: "GET",
        path: "/checkUsernameAvailable/:username",
        pathParams: CheckUsernamePathParametersSchema.strict(),
        responses: {
            200: ForkRecipesResponseSchema.describe("username is available"),
            409: ForkRecipesResponseSchema.describe("username is not available")
        },
        metadata: meta({
            rateLimit: "checkUsernameAvailable"
        })
    }
})