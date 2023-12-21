import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UsersServices } from "../services/UserService";
import { AuthServices } from "../services/AuthService";
import { loginDTO } from "../validators/loginDTO";
import UserRepository from "../repositories/userRepository";

export const authRouter = express.Router();

const { login } = new AuthController(
  new AuthServices(new UsersServices(new UserRepository()))
);

authRouter.post("/login", loginDTO, login);
