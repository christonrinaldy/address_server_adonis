import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import jwt from 'jsonwebtoken'
import Env from '@ioc:Adonis/Core/Env'

export default class Auth {
  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = request.header("token")
    if (token === undefined) {
      response.status(401).send("NOT AUTHORIZED");
      return;
    } else {
      const has_access = jwt.verify(token, Env.get('SECRET'));
      if (has_access) {
        await next()
      } else {
        response.status(401).send("NOT AUTHORIZED");
        return;
      }
    }
  }
}
