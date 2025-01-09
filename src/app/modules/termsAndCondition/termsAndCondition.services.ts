import { ITermsAndConditions } from "./termsAndCondition.interface";
import { TermsAndConditions } from "./termsAndCondition.model";

const createTermsAndConditions = async (payload: ITermsAndConditions) => {
    // Use the static method to upsert the document
    const result = await TermsAndConditions.upsertTerms(payload.text);
    return result;
};


const getTermsAndConditions = async () => {
    const termsAndCondition = await TermsAndConditions.find();
    return termsAndCondition;
};


const updateTermsAndConditions = async (payload: ITermsAndConditions) => {
    const termsAndCondition = await TermsAndConditions.updateOne(
        {},
        payload,
        { new: true }
    );
    return termsAndCondition;
};


export const TermsAndConditionServices = {
    createTermsAndConditions,
    getTermsAndConditions,
    updateTermsAndConditions,
}