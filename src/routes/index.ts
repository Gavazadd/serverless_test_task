import { Router } from 'express';

import links from './links/links.route';
import user from './user/user.route';

const router: Router = Router();

router.use('/links', links);
router.use('/user', user);

export default router;