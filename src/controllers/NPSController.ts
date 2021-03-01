import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class NPSController {
  async execute(req: Request, res: Response) {
    const { survey_id } = req.params;

    const userSurveyRepository = getCustomRepository(SurveysUsersRepository);
    const usersSurvey = await userSurveyRepository.find({ survey_id }); 

    const detractors = usersSurvey.filter(survey => survey.value < 7).length;
    const promoters = usersSurvey.filter(survey => survey.value < 9).length;
    const passives = usersSurvey.filter(survey => survey.value >= 7 && survey.value <= 8).length;
    const totalAnswers = usersSurvey.length;

    const NPS = (promoters - detractors) / totalAnswers * 100;

    res.status(200).json({
      detractors,
      promoters,
      passives,
      totalAnswers,
      NPS,
    })
  }
}

export { NPSController };