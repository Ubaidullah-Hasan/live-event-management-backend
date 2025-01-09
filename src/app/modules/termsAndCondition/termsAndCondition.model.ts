import { model, Schema } from "mongoose";
import { ITermsAndConditions, TTermsAndConditionsModel } from "./termsAndCondition.interface";

const termsSchema = new Schema<ITermsAndConditions>(
    {
        text: {
            type: String,
            required: [true, "Terms and Conditions text is required"],
            minlength: [20, "Terms and Conditions text must be at least 20 characters long"],
        },
    },
    { timestamps: true }
);


// Static method to ensure single document
termsSchema.statics.upsertTerms = async function (text: string) {
    // Check if a Terms and Conditions document already exists
    const existingTerms = await this.findOne();
    console.log({existingTerms})
    if (existingTerms) {
        // Update the existing document
        existingTerms.text = text;
        return await existingTerms.save();
    }

    // Create a new document if none exists
    return await this.create({ text });
};

export const TermsAndConditions = model<ITermsAndConditions, TTermsAndConditionsModel>("TermsAndConditions", termsSchema);