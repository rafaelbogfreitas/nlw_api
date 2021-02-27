import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
class UserController {
  async create(req: Request, res: Response) {
    const { name, email } = req.body;

    const userRepository = getCustomRepository(UserRepository);

    const foundUser = await userRepository.findOne({
      email: email
    });

    if(foundUser) {
      return res.status(400).json({
        error: "User already exists"
      })
    };

    const user = userRepository.create({
      name: name,
      email: email
    });

    await userRepository.save(user);

    return res.json(user);
  }
};

export { UserController };
