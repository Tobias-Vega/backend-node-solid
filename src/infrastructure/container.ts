import { container } from "tsyringe";
import { IUserRepository } from "../repositories/user.repository";
import { MongoUserRepository } from "../repositories/mongo-user.repository";

container.registerSingleton<IUserRepository>('IUserRepository', MongoUserRepository);