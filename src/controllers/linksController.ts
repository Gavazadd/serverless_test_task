import {NextFunction, Request, Response} from "express";

const linksService = require('../services/linksService')

class UserAuthController {

    async create(req: Request, res: Response, next: NextFunction) {
        try{
            const {url, userId, isOneTime, lifeDays} = req.body
            const userData = await linksService.create(url, userId,isOneTime, lifeDays)
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const {userId} = req.query
            const userData = await linksService.getAll(userId)
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
}


module.exports = new UserAuthController();