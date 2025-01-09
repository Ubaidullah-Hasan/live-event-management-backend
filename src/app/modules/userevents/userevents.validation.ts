import mongoose from "mongoose";
import { z } from "zod";
import { USER_EVENT_TYPE } from "./userevents.constant";

export const userEventValidationSchema = z.object({
  body: z.object({
    eventId: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Invalid eventId format",
    }),
  })
});