import {NextFunction, Request, Response} from "express";

const userService = require('../services/userAuthService')

class UserAuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await userService.registration()
            res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await userService.login()
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
}


module.exports = new UserAuthController();