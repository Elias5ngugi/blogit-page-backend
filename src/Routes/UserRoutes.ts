import { Router } from 'express';
import { createUser, loginUser, getUserById } from '../Controller/UserControllers';

const router = Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/user/:id', getUserById);

export default router;
