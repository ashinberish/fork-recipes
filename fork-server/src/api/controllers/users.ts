import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ForkRecipesRequest } from "../types";
import ForkError from "@/utils/error";
import * as UserDal from "@/dal/user";
import {
  CheckUsernamePathParameters,
  CheckUsernameResponse,
  CreateUserRequest,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
} from "@/contracts/users";
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

export async function checkUsername(
  req: ForkRecipesRequest<undefined, undefined, CheckUsernamePathParameters>
): Promise<ForkRecipesResponse<CheckUsernameResponse>> {
  try {
    const { username } = req.params;

    const isUsernameAvailable = await UserDal.isUsernameAvailable(username);

    if (isUsernameAvailable) {
      return new ForkRecipesResponse("username available", {
        usernameAvailable: isUsernameAvailable,
      });
    }
    throw new ForkError(409, "username unavailable");
  } catch (error) {
    throw new ForkError(500, "Oops! Something went wrong in the kitchen.");
  }
}

export async function createUser(
  req: ForkRecipesRequest<undefined, CreateUserRequest>
): Promise<ForkRecipesResponse<CreateUserResponse>> {
  try {
    const { name, email } = req.body;

    await UserDal.createUser(name, email);

    return new ForkRecipesResponse("User created", {
      verificationCodeSent: true,
    });
  } catch (error) {
    throw new ForkError(500, "Oops! Something went wrong in the kitchen.");
  }
}

export async function login(
  req: ForkRecipesRequest<undefined, LoginRequest>
): Promise<ForkRecipesResponse<LoginResponse>> {
  try {
    const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
    const { email, password } = req.body;

    const user = await UserDal.findUser(email);

    if (!user.password) {
      throw new ForkError(400, "Invalid login request");
    }

    let isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new ForkError(401, "Invalid email/password");
    }

    const accessToken = jwt.sign(
      { userId: user.uid, email: user.email },
      ACCESS_TOKEN_SECRET ?? "",
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId: user.uid },
      REFRESH_TOKEN_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );
    return new ForkRecipesResponse("success", {
      access_token: accessToken,
      refresh_token: refreshToken,
      email: user.email,
    });
  } catch (error) {
    throw new ForkError(500, "Oops! Something went wrong in the kitchen.");
  }
}
