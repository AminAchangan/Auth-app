import { z } from "zod";

export const phoneSchema = z.object({
  phone: z
    .string()
    .regex(
      /^09\d{9}$/,
      "phone number must be 11 digits long and start with 09."
    ),
});
