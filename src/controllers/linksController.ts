import {NextFunction, Request, Response} from "express";
import {ApiError} from "../error";
const {validationResult} = require('express-validator')
const linksService = require('../services/linksService')

class UserAuthController {

    async create(req: Request, res: Response, next: NextFunction) {
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json(new ApiError(errors.array()[0].msg, 400))
            }
            const {refreshToken} = req.cookies
            const {url, isOneTime, lifeDays} = req.body
            const userData = await linksService.create(url, isOneTime, lifeDays, refreshToken)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const {refreshToken} = req.cookies
            const userData = await linksService.getAll(refreshToken)
            res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async getUrl(req: Request, res: Response, next: NextFunction) {
        try{
            const {url} = req.params
            const origUrl = await linksService.getUrl(url)
            if (typeof (origUrl) === "object"){
                res.json(origUrl)
            }
            res.redirect(origUrl)
        }catch (e) {
            next(e)
        }
    }


    async delete(req: Request, res: Response, next: NextFunction) {
        try{
            const {shortUrl} = req.params
            const userData = await linksService.delete(shortUrl)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async deleteTest(req: Request, res: Response, next: NextFunction) {
        try{
            const {refreshToken} = req.cookies
            const userData = await linksService.deleteTest(refreshToken)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }

}


module.exports = new UserAuthController();