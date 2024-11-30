import { z } from "zod";

export const UserSchema = z.object({
    uid: z.string(),
    username: z.string(),
    email: z.string().email(),
    dob: z.date().optional(),
    email_verified_at: z.date().optional(),
    last_login: z.date().optional(),
    profile_picture: z.string().optional(),
    created_at: z.date().optional()
});
  