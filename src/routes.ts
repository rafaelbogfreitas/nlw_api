import { Router } from "express";
import { SurveyController } from "./controllers/SurveyController";
import { UserController } from "./controllers/UserController";
import { SendEmailController } from "./controllers/SendEmailController";
import { AnswerController } from "./controllers/AnswerController";

const router = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendEmailController = new SendEmailController();
const answerController = new AnswerController();

router.post("/users", userController.create);
router.post("/surveys", surveyController.create);
router.post("/sendEmail", sendEmailController.execute);

router.get("/surveys", surveyController.list);
router.get("/answers/:value", answerController.execute);

export { router };