import mongoose from "mongoose";
import { z } from "zod";

const termsUpdateValidationSchema = z.object({
    body: z.object({
        text: z
            .string({ required_error: "Terms and Conditions text is required" })
            .min(20, { message: "Terms and Conditions text must be at least 20 characters long" })
    })
});

const termsCreateValidationSchema = z.object({
    body: z.object({
        text: z
            .string({ required_error: "Terms and Conditions text is required" })
            .min(20, { message: "Terms and Conditions text must be at least 20 characters long" })
    })
})


export const termsValidation = {
    termsUpdateValidationSchema,
    termsCreateValidationSchema,
}