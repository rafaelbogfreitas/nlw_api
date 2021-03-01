import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveyRepository } from "../repositories/SurveyRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UserRepository";
import SendEmailService from "../services/SendEmailService";
import { resolve } from "path";

class SendEmailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveyRepository);
    const userSurveyRepository = getCustomRepository(SurveysUsersRepository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "User does not exist"
      });
    }

    const { id: userId } = user;

    const survey = await surveysRepository.findOne({ id: survey_id });

    if (!survey) {
      return res.status(400).json({
        error: "Survey does not exist"
      });
    }

    const surveyUserAlreadyExists = await userSurveyRepository.findOne({
      where: {user_id: user.id, value: null},
      relations: ["user", "survey"]
    });
    
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL
    }

    const viewPath = resolve(__dirname, "..", "views", "emails", "npsEmail.hbs");

    if(surveyUserAlreadyExists) {
      console.log(surveyUserAlreadyExists.id, "=====>>>>>>>>")
      variables.id = surveyUserAlreadyExists.id;
      await SendEmailService.execute(email, survey.title, variables, viewPath);
      return res.json(surveyUserAlreadyExists);
    }

    const surveyUserRepository = userSurveyRepository.create({
      user_id: userId,
      survey_id: survey_id
    });

    await SendEmailService.execute(email, survey.title, variables, viewPath);

    return res.status(201).json(surveyUserRepository);

  }
};

export { SendEmailController };
