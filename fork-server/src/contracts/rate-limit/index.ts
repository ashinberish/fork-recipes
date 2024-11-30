export type Window = "second" | "minute" | "hour" | "day" | number;
export type RateLimitOptions = {
  /** Timeframe or time in milliseconds */
  window: Window;
  /** Max request within the given window */
  max: number;
};

export const limits = {
    userGet: {
        window: "hour",
        max: 60
    },
    checkUsernameAvailable: {
        window: "hour",
        max: 60
    }
} satisfies Record<string, RateLimitOptions>;

export type RateLimiterId = keyof typeof limits;
export type RateLimitIds = {
  /** rate limiter options for non-apeKey requests */
  normal: RateLimiterId;
  /** Rate limiter options for apeKey requests */
  apeKey: RateLimiterId;
};