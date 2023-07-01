import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";
import {ApiError} from "../error";
import {ReqBodyInterface } from "../interfaces/reqBody.interface";
import {UserBodyInterface } from "../interfaces/userBody.interface";

const userService = require('../services/userAuthService')

class UserAuthController {
    async registration(req:  ReqBodyInterface<UserBodyInterface>, res: Response, next: NextFunction) {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json(new ApiError(errors.array()[0].msg, 400))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async login(req: ReqBodyInterface<UserBodyInterface>, res: Response, next: NextFunction) {
        try{
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
}

module.exports = new UserAuthController();