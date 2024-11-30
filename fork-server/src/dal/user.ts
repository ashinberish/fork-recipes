import ForkError from "@/utils/error";
import { prisma } from "@/utils/prisma";
import { PrismaClient } from "@prisma/client"


// export async function getUser(_uid:string):Promise<User> {
//     const user = await prisma.users.findUnique({where: {uid: _uid}})

//     if(!user) throw new ForkError(404, "User not found");

//     return user
// }

export async function isUsernameAvailable(username: string): Promise<boolean> {
    const user = await prisma.users.findUnique({
        where: {
            username: username,
        },
    });

    return user === null; // Returns true if no user is found (username is available)
}