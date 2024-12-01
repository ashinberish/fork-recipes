import { initContract } from "@ts-rest/core"
import { usersContract } from "./users";

const c = initContract();

export const contract = c.router({
    users: usersContract
},{
    strictStatusCodes: true,
    pathPrefix: '/api/v1'
})