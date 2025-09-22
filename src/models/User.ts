import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

export const userModel = model<IUser>('User', UserSchema);