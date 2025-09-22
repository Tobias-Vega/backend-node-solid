import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "./user.interface";

export interface IUserService {
  createUser(data: CreateUserDto): Promise<IUser>
  getUser(id: string): Promise<IUser | null>
  listUsers(): Promise<IUser[]>
  updateUser(id: string, data: CreateUserDto): Promise<IUser | null>
  deleteUser(id: string): Promise<void>
}