import { z } from "zod";

export const reportValidationSchema = z.object({
    body: z.object({
        reportedPerson: z
            .string()
            .nonempty("Reported person is required")
            .regex(/^[a-fA-F0-9]{24}$/, "Reported person must be a valid ObjectId"), // MongoDB ObjectId চেক
        text: z
            .string()
            .nonempty("Report text is required")
            .min(10, "Report text must be at least 10 characters long")
            .max(500, "Report text must not exceed 500 characters"),
    })
});
