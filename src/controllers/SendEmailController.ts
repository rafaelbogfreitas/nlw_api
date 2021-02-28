import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendEmailService from "../services/SendEmailService";

class SendEmailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const userSurveyRepository = getCustomRepository(SurveysUsersRepository);

    const doesUserExists = await usersRepository.findOne({ email });

    if (!doesUserExists) {
      return res.status(400).json({
        error: "User does not exist"
      });
    }

    const { id: userId } = doesUserExists;

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      return res.status(400).json({
        error: "Survey does not exist"
      });
    }

    const surveyUserRepository = userSurveyRepository.create({
      user_id: userId,
      survey_id: survey_id
    });

    await SendEmailService.execute(email, survey, );

    return res.status(201).json(surveyUserRepository);

  }
};

export { SendEmailController };
