import { ForkRecipesResponse } from "@/utils/fork-recipes-response";
import { AppRoute, AppRouter } from "@ts-rest/core";
import { ForkRecipesRequest } from "./types";
import { TsRestRequest } from "@ts-rest/express";

export function callController<
  TRoute extends AppRoute | AppRouter,
  TQuery,
  TBody,
  TParams,
  TResponse,
  //ignoring as it might be used in the future
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  TStatus = 200,
>(
  handler: ForkRecipesHandler<TQuery, TBody, TParams, TResponse>
): (all: TypeSafeTsRestRequest<TRoute, TQuery, TBody, TParams>) => Promise<{
  status: TStatus;
  body: ForkRecipesResponse<TResponse>;
}> {
  return async (all) => {
    const req: ForkRecipesRequest<TQuery, TBody, TParams> = {
      body: all.body as TBody,
      query: all.query as TQuery,
      params: all.params as TParams,
      raw: all.req,
      //ctx: all.req["ctx"] as Context,
    };

    const result = await handler(req);
    const response = {
      status: 200 as TStatus,
      body: {
        message: result.message,
        data: result.data,
      },
    };

    return response;
  };
}

type WithBody<T> = {
  body: T;
};
type WithQuery<T> = {
  query: T;
};

type WithParams<T> = {
  params: T;
};

type WithoutBody = {
  body?: never;
};
type WithoutQuery = {
  query?: never;
};
type WithoutParams = {
  params?: never;
};

type ForkRecipesHandler<TQuery, TBody, TParams, TResponse> = (
  req: ForkRecipesRequest<TQuery, TBody, TParams>
) => Promise<ForkRecipesResponse<TResponse>>;

type TypeSafeTsRestRequest<
  TRoute extends AppRoute | AppRouter,
  TQuery,
  TBody,
  TParams,
> = {
  req: TsRestRequest<TRoute>;
} & (TQuery extends undefined ? WithoutQuery : WithQuery<TQuery>) &
  (TBody extends undefined ? WithoutBody : WithBody<TBody>) &
  (TParams extends undefined ? WithoutParams : WithParams<TParams>);
