import { EntityRepository, Repository } from "typeorm";
import { SurveysUsers } from "../models/SurveyUsers";

@EntityRepository(SurveysUsers)
class SurveysUsersRepository extends Repository<SurveysUsers> { }

export { SurveysUsersRepository };
