import PharmacyController from "../controllers/PharmacyController.js";
import express from 'express'

const PharmacyRoute = express.Router();

// @desc Get all notes
PharmacyRoute.get('/pharmacies', PharmacyController.getAllPharmacy);

// @desc Get note by ID
PharmacyRoute.get('/pharmacies/:id', PharmacyController.getPharmacyById);

// // @desc Create note
// PharmacyRoute.post('/notes', PharmacyController.createNote);

// // @desc Update note by ID
// PharmacyRoute.put('/notes/:id', PharmacyController.updateNote);

// // @desc Delete note by ID
// PharmacyRoute.delete('/notes/:id', PharmacyController.deleteNote);

export default PharmacyRoute