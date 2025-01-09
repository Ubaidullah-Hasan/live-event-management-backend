import { z } from "zod";

export const TicketValidationSchema = z.object({

  eventId: z.string().refine((id) => /^[a-f\d]{24}$/i.test(id), {
    message: "Invalid ObjectId format for eventId",
  }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});


export const IsMyTicketValidationSchema = z.object({
  body: z.object({
    ticketId: z.string().refine((id) => /^[a-f\d]{24}$/i.test(id), {
      message: "Invalid ObjectId format for eventId",
    }),
    secretCode: z.string({ required_error: "Secret code in required." })
  })
});