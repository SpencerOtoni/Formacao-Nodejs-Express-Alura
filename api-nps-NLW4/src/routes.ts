import { Router } from 'express'

import { SurveysController } from './controllers/SurveysController'
import { UserController } from './controllers/UserController'
import { SendMailController } from './controllers/SendMailController'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { AuthService } from './controllers/AuthService'

import authMiddleware from './middlewares/auth';

const router = Router()

const userController = new UserController()
const surveysController = new SurveysController()
const sendMailController = new SendMailController()
const answerController = new AnswerController()
const npsController = new NpsController()
const authService = new AuthService()

router.post("/users", userController.create)
router.post("/session", authService.create)

router.get("/answers/:value", answerController.create)

router.use(authMiddleware);

router.post("/surveys", surveysController.create)
router.get("/surveys", surveysController.show)

router.post("/sendMail", sendMailController.create)

router.get("/nps/:id", npsController.create)

export { router }