import { usersContact } from "@/contracts/users";
import { initServer } from "@ts-rest/express";
import { callController } from "../ts-rest-adapter";

import * as UserController from "@/api/controllers/users";

const s = initServer();

export default s.router(usersContact, {
    //get: {
    //         handler: async (r) => callController() 
    //     }
    checkUsernameAvailable: {
        handler: async (r) => callController(UserController.checkUsername)(r),
    }
})