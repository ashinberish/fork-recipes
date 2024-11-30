import { ForkRecipesResponseType } from "@/contracts/schemas/api";


export type ForkRecipesDataAware<T> = {
    data: T | null;
  };

export class ForkRecipesResponse<T = null>
  implements ForkRecipesResponseType, ForkRecipesDataAware<T>
{
  public message: string;
  public data: T;

  constructor(message: string, data: T) {
    this.message = message;
    this.data = data;
  }
}