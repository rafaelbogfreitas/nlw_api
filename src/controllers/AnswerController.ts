import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const userSurveyRepository = getCustomRepository(SurveysUsersRepository);
    const userSurvey = await userSurveyRepository.findOne({ id: String(u) });

    if(!userSurvey) {
      return res.status(400).json({
        error: "Survey does not exist!"
      })
    }

    userSurvey.value = Number(value);

    await userSurveyRepository.save(userSurvey);

    return res.status(201).json(userSurvey);
  }
};

export { AnswerController };