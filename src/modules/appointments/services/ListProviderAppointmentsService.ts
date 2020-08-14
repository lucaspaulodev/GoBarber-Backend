import {injectable, inject} from 'tsyringe'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
// import User from '@modules/users/infra/typeorm/entities/User'

interface IRequest{
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({provider_id, year, month, day}: IRequest): Promise<Appointment[]>{
    const cacheData = await this.cacheProvider.recover('');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      day,
      month,
      year,
    })

    await this.cacheProvider.save('', '');

    return appointments;
  }
}

export default ListProviderAppointmentsService
