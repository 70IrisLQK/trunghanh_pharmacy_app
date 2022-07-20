import NoteTypeController from "../controllers/NoteTypeController.js";
import express from 'express'

const NoteTypeRoute = express.Router();

// @desc Get all note_type
NoteTypeRoute.get('/note_type', NoteTypeController.getAllNoteType);

// @desc Get note by ID
NoteTypeRoute.get('/note_type/:id', NoteTypeController.getNoteTypeById);

// @desc Create note
NoteTypeRoute.post('/note_type', NoteTypeController.createNoteType);

// @desc Update note by ID
NoteTypeRoute.put('/note_type/:id', NoteTypeController.updateNoteType);

// @desc Delete note by ID
NoteTypeRoute.delete('/note_type/:id', NoteTypeController.deleteNoteType);

export default NoteTypeRoute