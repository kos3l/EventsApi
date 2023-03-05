import mongoose from "mongoose";

export interface ICreateEventDTO {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  address: string;
  createdBy: mongoose.Types.ObjectId;
}
