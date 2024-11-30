import { usersContact } from "@/contracts/users";
import { initServer } from "@ts-rest/express";

const s = initServer();

export default s.router(usersContact,{
    get: {
        handler: async (r) => callController 
    }
}

)