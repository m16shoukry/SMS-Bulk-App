import express from "express";
import { AuthController } from "../controllers/AuthController";
import { UsersServices } from "../services/UserService";
import { AuthServices } from "../services/AuthService";
import { loginDTO } from "../validators/loginDTO";

export const authRouter = express.Router();

const { login } = new AuthController(new AuthServices(new UsersServices()));

authRouter.post("/login", loginDTO, login);
