import { Router } from 'express';
const {body} = require('express-validator');

const userAuthController = require('../../controllers/userAuthController')

const router: Router = Router();

router.post('/registration',
    body('email').isEmail().notEmpty().withMessage('Your email has incorrect from.'),
    body('password').isLength({min: 5, max: 32}).withMessage('Password length must be from 5 to 32.'),
    userAuthController.registration);
router.post('/login',userAuthController.login);


export default router;