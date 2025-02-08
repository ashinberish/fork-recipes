import {
  ForkRecipesResponseSchema,
  meta,
  responseWithData,
} from "@/contracts/schemas/api";
import { UserSchema } from "@/contracts/schemas/users";
import { ForkRecipesResponse } from "@/utils/fork-recipes-response";
import { initContract } from "@ts-rest/core";
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
  usernameAvailable: z.boolean(),
});
export type CheckUsernameResponse = z.infer<typeof CheckUsernameResponseSchema>;

export const CreateUserRequestSchema = z.object({
  email: z.string().email(),
  name: z.string(),
});
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const CreateUserResponseSchema = z.object({
  verificationCodeSent: z.boolean(),
});
export type CreateUserResponse = z.infer<typeof CreateUserResponseSchema>;

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const LoginResponseSchema = z.object({
  email: z.string(),
  access_token: z.string(),
  refresh_token: z.string(),
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const usersContract = c.router(
  {
    checkUsernameAvailable: {
      summary: "Check username available",
      description: "Checks to see if a username is available",
      method: "GET",
      path: "/checkUsernameAvailable/:username",
      pathParams: CheckUsernamePathParametersSchema.strict(),
      responses: {
        200: ForkRecipesResponseSchema.describe("username is available"),
        409: ForkRecipesResponseSchema.describe("username is not available"),
      },
      metadata: meta({
        rateLimit: "checkUsernameAvailable",
      }),
    },
    createUser: {
      summary: "Creates a user",
      description: "Creates a unverified user in the system.",
      method: "POST",
      path: "/createUser",
      body: CreateUserRequestSchema.strict(),
      responses: {
        200: ForkRecipesResponseSchema.describe("user is created"),
      },
    },
    login: {
      summary: "Login user",
      description: "Logging a user in and returns tokens.",
      method: "POST",
      path: "/login",
      body: LoginRequestSchema.strict(),
      responses: {
        200: ForkRecipesResponseSchema.describe("Success"),
        401: ForkRecipesResponseSchema.describe("Not Authorized"),
      },
    },
  },
  {
    strictStatusCodes: true,
    pathPrefix: "/users",
  }
);
