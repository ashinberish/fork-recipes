import { sendEmail } from "@/utils/email-client";
import ForkError from "@/utils/error";
import { prisma } from "@/utils/prisma";
import { PrismaClient, Users } from "@prisma/client";
import { randomUUID } from "crypto";

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

export async function isEmailAlreadyExist(
  email: string
): Promise<{ exists: boolean; verified: boolean }> {
  const user = await prisma.users.findUnique({
    where: {
      email: email,
      deleted_at: null,
    },
  });

  if (user && user.email_verified_at) {
    return { exists: true, verified: true }; // User exists and is verified
  }

  if (user) {
    return { exists: true, verified: false }; // User exists but is not verified
  }

  return { exists: false, verified: false }; // User does not exist
}

export async function createUser(
  name: string,
  email: string
): Promise<boolean> {
  const { exists, verified } = await isEmailAlreadyExist(email);

  if (exists && verified) {
    throw new ForkError(400, "User already exists");
  }

  const verificationToken = randomUUID();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // TODO: make this configurable

  try {
    if (exists && !verified) {
      await prisma.verificationToken.update({
        where: {
          uid: (await prisma.users.findUnique({
            where: { email },
          }))!.uid,
        },
        data: {
          token: verificationToken,
          expiresAt,
        },
      });

      await sendEmail("email_verification", email, {
        name: name,
        verificationLink: verificationToken,
      });

      return true;
    }

    await prisma.users.create({
      data: {
        name,
        email,
        verificationToken: {
          create: {
            token: verificationToken,
            expiresAt: expiresAt,
          },
        },
      },
    });

    //await sendVerificationEmail(email, verificationToken); //TODO: add mailer

    return true;
  } catch (error) {
    throw new ForkError(500, "Error while creating a user");
  }
}

export async function findUser(email: string): Promise<Users> {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
        deleted_at: null,
      },
    });

    if (user == null) {
      throw new ForkError(400, "User not found");
    }
    return user;
  } catch (error) {
    throw new ForkError(500, "Error while creating a user");
  }
}
