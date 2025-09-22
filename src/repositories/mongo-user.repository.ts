import { injectable } from "tsyringe";
import { IUserRepository } from "./user.repository";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../interfaces/user.interface";
import { userModel } from "../models/User";
import { UpdateUserDto } from "../dtos/update-user.dto";

@injectable()
export class MongoUserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<IUser> {
    const created = new userModel(data);
    return created.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return userModel.findById(id).exec();
  }

  async findAll(): Promise<IUser[]> {
    return userModel.find().exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return userModel.findOne({ email }).exec();
  }

  async update(id: string, data: UpdateUserDto): Promise<IUser | null> {
    return userModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    userModel.findByIdAndDelete(id).exec();
  }
}