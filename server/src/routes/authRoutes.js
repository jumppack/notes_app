import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Mount registration and login routes
router.post('/register', register);
router.post('/login', login);

export default router;
