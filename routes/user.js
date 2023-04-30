import express from 'express';
import { getUser, getUsers } from '../controllers/user.js'
import { authenticateToken } from '../utils/token.js';


const router = express.Router();

router.get('/', authenticateToken, getUsers)
router.get('/:userId', authenticateToken, getUser)

export default router
