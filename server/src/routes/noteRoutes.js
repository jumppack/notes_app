import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import Note from '../models/Notes.js';
import { noteSchema } from '../validators/noteValidator.js';

const router = express.Router();

// Route for getting all notes - protected by verifyToken
router.get('/', verifyToken, async (req, res) => {
  const notes = await Note.find({owner: req.user.id});
  res.json({ notes });
});

// Route for creating a new note - protected by verifyToken
router.post('/', verifyToken, async (req, res) => {
  const result = noteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({message: result.error.errors[0].message});
  }
  const {title, content} = result.data;
  const note = new Note({owner: req.user.id, title, content});
  await note.save();
  res.json({ note });
});

// Route for updating a note - protected by verifyToken
router.put('/:noteId', verifyToken, async (req, res) => {
  const result = noteSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({message: result.error.errors[0].message});
  }
  const {title, content} = result.data;
  const note = await Note.findById(req.params.noteId);
  if (!note) {
    return res.status(404).json({message: "Note not found"});
  }
  if (note.owner.toString() !== req.user.id) {
    return res.status(403).json({message: "Unauthorized"});
  }
  note.title = title;
  note.content = content;
  await note.save();
  res.json({ note });
});

// Route for deleting a note - protected by verifyToken
router.delete('/:noteId', verifyToken, async (req, res) => {
  const note = await Note.findById(req.params.noteId);
  if (!note) {
    return res.status(404).json({message: "Note not found"});
  }
  if (note.owner.toString() !== req.user.id) {
    return res.status(403).json({message: "Unauthorized"});
  }
  await note.deleteOne();
  res.status(204).json({message: "Note deleted successfully"});
});

export default router;
