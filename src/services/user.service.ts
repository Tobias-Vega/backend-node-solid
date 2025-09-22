import { inject, injectable } from "tsyringe";
import { IUserService } from "../interfaces/user-service.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { IUser } from "../interfaces/user.interface";
import { IUserRepository } from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { UpdateUserDto } from "../dtos/update-user.dto";

@injectable()
export class UserService implements IUserService {

  constructor(
    @inject('IUserRepository')
    private userRepo: IUserRepository,
  ) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    const exists = await this.userRepo.findByEmail(data.email);
    if (exists) throw  new Error("");

    const hashed = await bcrypt.hash(data.password, 10);
    const created = await this.userRepo.create({ ...data, password: hashed });
    return created;
  }

  async getUser(id: string): Promise<IUser | null> {
    return this.userRepo.findById(id);
  }

  async listUsers(): Promise<IUser[]> {
    return this.userRepo.findAll();
  }

  async updateUser(id: string, data: UpdateUserDto): Promise<IUser | null> {
    if (data.email) {
      const other = await this.userRepo.findByEmail(data.email);
      if (other && other.id !== id) throw new Error();
    }
    if (data.password) data.password = await bcrypt.hash(data.password , 10);
    return this.userRepo.update(id, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepo.delete(id);
  }
}