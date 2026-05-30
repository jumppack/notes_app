import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for getting all notes - protected by verifyToken
router.get('/', verifyToken, (req, res) => {
  res.json({ message: 'Notes endpoint placeholder (GET)', user: req.user });
});

// Route for creating a new note - protected by verifyToken
router.post('/', verifyToken, (req, res) => {
  res.json({ message: 'Notes endpoint placeholder (POST)', user: req.user });
});

export default router;
