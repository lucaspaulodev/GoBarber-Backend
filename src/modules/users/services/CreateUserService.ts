import {injectable, inject} from 'tsyringe'

import AppError from '@shared/errors/AppError'
import IUsersRepository from '@modules/users/repositories/IUserRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/User'
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'

interface IRequest{
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({name, email, password}: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists){
      throw new AppError('Email already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.cacheProvider.invalidatePrefix('provider-list')

    return user
  }
}

export default CreateUserService
