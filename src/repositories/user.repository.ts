import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { IUser } from "../interfaces/user.interface";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
  update(id: string, data: UpdateUserDto): Promise<IUser | null>
  delete(id: string): Promise<void>
}