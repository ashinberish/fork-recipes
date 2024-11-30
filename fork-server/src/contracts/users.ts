import { meta, responseWithData } from "@/contracts/schemas/api";
import { UserSchema } from "@/contracts/schemas/users";
import { initContract } from "@ts-rest/core"

const c = initContract();

export const usersContact = c.router({
    get: {
        summary: "Get user",
        description: "Get a user's data.",
        method: "GET",
        path: "",
        responses: {
            200: responseWithData(UserSchema)
        },
        metadata: meta({
            rateLimit: "userGet"
        })
    }
})