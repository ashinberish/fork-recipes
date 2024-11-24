import { z, ZodSchema } from "zod";

export const ForkResponseSchema = z.object({
    message: z.string(),
  });

export const ForkClientError = ForkResponseSchema;
export const ForkServerError = ForkClientError.extend({
  errorId: z.string(),
  uid: z.string().optional(),
});
export type ForkServerErrorType = z.infer<typeof ForkServerError>;
