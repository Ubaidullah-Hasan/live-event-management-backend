import { Document, ObjectId } from "mongoose";

export interface IFollow extends Document {
    userId: ObjectId; //  store user id
    followingId: ObjectId; // store creator id
  }