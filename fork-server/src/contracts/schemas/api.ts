import { z, ZodSchema } from "zod";
import { RateLimiterId, RateLimitIds } from "../rate-limit";

export const ForkRecipesResponseSchema = z.object({
    message: z.string(),
  });

export const ForkResponseSchema = z.object({
    message: z.string(),
  });

export const ForkClientError = ForkResponseSchema;
export const ForkServerError = ForkClientError.extend({
  errorId: z.string(),
  uid: z.string().optional(),
});

export type ForkRecipesResponseType = z.infer<typeof ForkResponseSchema>;

export const ForkRecipesValidationErrorSchema = ForkResponseSchema.extend({
  validationErrors: z.array(z.string()),
});
export type ForkRecipesValidationError = z.infer<typeof ForkRecipesValidationErrorSchema>;


export type ForkServerErrorType = z.infer<typeof ForkServerError>;


export function responseWithData<T extends ZodSchema>(
    dataSchema: T
  ): z.ZodObject<
    z.objectUtil.extendShape<
      typeof ForkRecipesResponseSchema.shape,
      {
        data: T;
      }
    >
  > {
    return ForkRecipesResponseSchema.extend({
      data: dataSchema,
    });
  }

  export type EndpointMetadata = {

    /** RateLimitId or RateLimitIds.
     * Only specifying RateLimiterId will use  a default limiter with 30 requests/minute for ApeKey requests.
     */
    rateLimit?: RateLimiterId | RateLimitIds;

  };
  
  /**
   *
   * @param meta Ensure the type of metadata is `EndpointMetadata`.
   * Ts-rest does not allow to specify the type of `metadata`.
   * @returns
   */
  export function meta(meta: EndpointMetadata): EndpointMetadata {
    return meta;
  }
  