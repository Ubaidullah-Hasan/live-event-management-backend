import { Document, Model, ObjectId } from 'mongoose';

export interface ITermsAndConditions extends Document {
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TTermsAndConditionsModel = {
    upsertTerms(text: string): any;
} & Model<ITermsAndConditions>