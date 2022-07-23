import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Env from '@ioc:Adonis/Core/Env'
import jwt from 'jsonwebtoken'

export default class UsersController {
    static async login(ctx: HttpContextContract) {
        const { username, password } = ctx.request.body();
        const foundUser = await Database.rawQuery("select * from users where username = ?", [username])

        if (foundUser.rowCount === 0) {
            ctx.response.status(404);
            return 'NOT FOUND'
        } else {
            if (foundUser.rows[0].password == password) {
                const token = jwt.sign({ username, password }, Env.get('SECRET'))
                ctx.response.status(200);
                return {token}
            } else {
                ctx.response.status(403);
                return {
                    message: "wrong username/password"
                }
            }
        }
        return foundUser;
    }
}
