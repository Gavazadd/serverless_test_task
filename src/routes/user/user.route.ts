import { Router } from 'express';

const userAuthController = require('../../controllers/userAuthController')

const router: Router = Router();

router.post('/registration', userAuthController.registration);
router.post('/login',userAuthController.login);


export default router;