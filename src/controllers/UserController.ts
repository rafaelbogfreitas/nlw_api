import { Request, Response } from "express";

class UserController {
  async create(req: Request, res: Response) {
    const body = JSON.parse(req.body);
    return res.json({ body });
  }
};

export { UserController };