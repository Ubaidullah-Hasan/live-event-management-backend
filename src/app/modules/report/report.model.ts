import mongoose, { Schema, model } from "mongoose";
import { IReport } from "./report.interface";

const reportSchema = new Schema<IReport>(
  {
    reportedBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Reported by is required"] 
    },
    reportedPerson: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: [true, "Reported person is required"] 
    },
    text: { 
      type: String, 
      required: [true, "Report text is required"], 
      minlength: [10, "Report text must be at least 10 characters long"], 
      maxlength: [500, "Report text must not exceed 500 characters"] 
    },
  },
  { timestamps: true } 
);

export const Report = model<IReport>("Report", reportSchema);
