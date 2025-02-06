import { z } from "zod";

export const UserSchema = z.object({
  uid: z.string(),
  username: z.string(),
  email: z.string().email(),
  dob: z.date().optional(),
  email_verified_at: z.date().optional(),
  last_login: z.date().optional(),
  profile_picture: z.string().optional(),
  created_at: z.date().optional(),
});

export type GetUserResponse = z.infer<typeof UserSchema>;

export const CheckUserNameSchema = z.object({
  username: z.string(),
});

export type checkUserNameRequest = z.infer<typeof CheckUserNameSchema>;
