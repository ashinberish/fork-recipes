import { initContract } from "@ts-rest/core"
import { usersContact } from "./users";

const c = initContract();

export const contract = c.router({
    users: usersContact
})