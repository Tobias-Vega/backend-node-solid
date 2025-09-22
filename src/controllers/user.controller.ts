import { autoInjectable } from "tsyringe";
import { UserService } from "../services/user.service";
import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

@autoInjectable()
export class UserController {
  constructor(private userService: UserService) {}

  async create(req: Request, res: Response) {
    const dto = plainToInstance(CreateUserDto, req.body);
    const user = await this.userService!.createUser(dto);
    res.status(201).json(user);
  }

  async list(_req: Request, res: Response) {
    const users = await this.userService!.listUsers();
    res.status(200).json(users);
  }

  async get(req: Request, res: Response) {
    const user = await this.userService!.getUser(req.params.id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const dto = plainToInstance(UpdateUserDto, req.body);
    const user = await this.userService!.updateUser(req.params.id, dto);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  }

  async delete(req: Request, res:Response) {
    await this.userService!.deleteUser(req.params.id);
    res.status(204).send();
  }
}