import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import { MongoUserRepository } from "../repositories/mongo-user.repository";

const userRouter = Router();
const userRepo = new MongoUserRepository();
const userService = new UserService(userRepo);
const controller = new UserController(userService);

userRouter.post('/', controller.create.bind(controller));
userRouter.get('/', controller.list.bind(controller));
userRouter.get('/:id', controller.get.bind(controller));
userRouter.put('/:id', controller.update.bind(controller));
userRouter.delete('/:id', controller.delete.bind(controller));

export default userRouter;