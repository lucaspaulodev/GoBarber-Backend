import {Router} from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import AppoitmentsController from '../controllers/AppoitmentsController'

const appointmentsRouter = Router()
const appointmentsController = new AppoitmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter
