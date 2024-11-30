import { TsRestRequest as TsRestRequestGeneric } from "@ts-rest/express";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TsRestRequest = TsRestRequestGeneric<any>;

export type ForkRecipesRequest<
  TQuery = undefined,
  TBody = undefined,
  TParams = undefined
> = {
  query: Readonly<TQuery>;
  body: Readonly<TBody>;
  params: Readonly<TParams>;
//   ctx: Readonly<Context>;
  raw: Readonly<TsRestRequest>;
};