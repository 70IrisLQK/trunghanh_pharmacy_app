import RouteController from "../controllers/RouteController.js";
import express from 'express'

const Route = express.Router();

// @desc Get all note_type
Route.get('/routes', RouteController.getAllRoute);

Route.get('/route_status', RouteController.getRouteStatus);

// @desc Get route by ID
Route.get('/route_users', RouteController.getRouteById);

// // @desc Create note
// Route.post('/note_type', NoteTypeController.createNoteType);

// // @desc Update note by ID
// Route.put('/note_type/:id', NoteTypeController.updateNoteType);

export default Route