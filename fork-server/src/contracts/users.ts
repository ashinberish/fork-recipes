import { ForkRecipesResponseSchema, meta, responseWithData } from "@/contracts/schemas/api";
import { UserSchema } from "@/contracts/schemas/users";
import { ForkRecipesResponse } from "@/utils/fork-recipes-response";
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

export const CheckUsernameResponseSchema = z.object({
    usernameAvailable: z.boolean()
})
export type CheckUsernameResponse = z.infer<typeof CheckUsernameResponseSchema>;


export const CreateUserRequestSchema = z.object({
    email: z.string().email(),
    name: z.string(),
});
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const CreateUserResponseSchema = z.object({
    verificationCodeSent: z.boolean()
})
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;

export const usersContract = c.router({
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
    },
    createUser: {
        summary: "Creates a user",
        description: "Creates a unverified user in the system.",
        method: "POST",
        path: "/createUser",
        body: CreateUserRequestSchema.strict(),
        responses: {
            200: ForkRecipesResponseSchema.describe("user is created"),
        }
    },
}, {
    strictStatusCodes: true,
    pathPrefix: "/users"
})