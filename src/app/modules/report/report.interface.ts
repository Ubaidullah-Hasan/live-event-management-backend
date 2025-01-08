import { Document, ObjectId } from "mongoose";

export interface IReport extends Document{
    reportedBy: ObjectId;
    reportedPerson: ObjectId;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}