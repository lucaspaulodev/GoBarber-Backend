import {Router} from 'express'
import { parseISO} from 'date-fns'
import { getCustomRepository } from 'typeorm'



import AppointmentsRepository from '../../typeorm/repositories/AppointmentsRepository'
import CreateAppointmentsServices from '../../../services/CreateAppointmentService'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user)
  const appointmentsRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentsRepository.find()
  return response.json(appointments)
})

appointmentsRouter.post('/', async (request, response) => {

    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentsServices()

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate
    })

    return response.json(appointment)
})

export default appointmentsRouter
