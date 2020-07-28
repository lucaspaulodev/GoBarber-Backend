import {Request, Response} from 'express'
import {container} from 'tsyringe'

import ResetPasswordService from '@modules/users/services/ResetPasswordService'

// Segundo a metodologia RESTFULL, um controller deve ter apenas os metodos:
// Index, show, create, update, delete

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body

    const resetPassword = container.resolve(ResetPasswordService)

    await resetPassword.execute({
      token,
      password,
    })

    return response.status(204).json()
  }
}
