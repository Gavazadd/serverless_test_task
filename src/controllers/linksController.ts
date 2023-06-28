import {NextFunction, Request, Response} from "express";

const linksService = require('../services/linksService')

class UserAuthController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await linksService.getAll()
            res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await linksService.getById()
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await linksService.create()
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try{
            const userData = await linksService.delete()
            return res.json(userData)
        }catch (e) {
            next(e)
        }
    }
}


module.exports = new UserAuthController();