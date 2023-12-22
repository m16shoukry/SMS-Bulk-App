import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import UserRepository from "../repositories/userRepository";

export default class AuthMiddleware {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (decoded) {
          const user = await this.userRepository.findOneBy({
            id: decoded["id"],
          });

          req["user"] = user;
          next();
        } else {
          return res.status(401).json({ message: "Unauthorized" });
        }
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
}
