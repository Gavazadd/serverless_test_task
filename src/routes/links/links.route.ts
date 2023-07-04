import { Router } from 'express';
import {body, } from "express-validator";
import {authMiddleware} from "../../middlewares/authMiddleware";
const linksController = require('../../controllers/linksController')

const router : Router = Router();

router.post('/',
    authMiddleware,
    body('url').isURL().notEmpty().withMessage('Type valid URL.'),
    body('isOneTime').notEmpty().isBoolean().withMessage('isOneTime must be boolean.'),
    body('lifeDays').notEmpty().withMessage('LifeDays can`t be empty.'),
    linksController.create);

router.get('/', authMiddleware, linksController.getAll);

router.get('/:url', authMiddleware, linksController.getUrl);

router.delete('/:shortUrl', authMiddleware, linksController.delete);

export default router;