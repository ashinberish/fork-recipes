import { checkUserNameRequest, GetUserResponse } from "@/contracts/schemas/users";
import { ForkRecipesRequest } from "../types";
import ForkError from "@/utils/error";
import * as UserDal from "@/dal/user";
import { CheckUsernamePathParameters } from "@/contracts/users";
import { ForkRecipesResponse } from "@/utils/fork-recipes-response";

// export async function getUser(req: ForkRecipesRequest): Promise<GetUserResponse> {
//     try {
//         let uid = req.body.uid
//         return UserDal.getUser(uid);
//     }
//     catch (e) {
//         if (e.status === 400) {
//             throw new ForkError(404, "User not found")
//         }
//         throw new ForkError(500, "Something went wrong")
//     }
// }

export async function checkUsername(req: ForkRecipesRequest<undefined, undefined, CheckUsernamePathParameters>): Promise<ForkRecipesResponse<{ username_available: Boolean }>> {
    try {
        const { username } = req.params;

        const isUsernameAvailable = await UserDal.isUsernameAvailable(username);

        return new ForkRecipesResponse(isUsernameAvailable ? "username available" : "username unavailable", { username_available: isUsernameAvailable });
    }
    catch (error) {
        throw new ForkError(500, "Oops! Something went wrong in the kitchen.")
    }
}