import NoteController from "../controllers/NoteController.js";
import express from "express";
import multer from "multer";
import uuidv4 from "uuid";
import path from "path";
import fs from "fs";
import { upload } from "../utils/UploadImage.js";
const NoteRoute = express.Router();

// @desc Get all notes
NoteRoute.get("/notes", NoteController.getAllNote);

// @desc Get note by ID
NoteRoute.get("/notes/:id", NoteController.getNoteById);

// @desc Create note
NoteRoute.post("/notes", upload.array("image", 6), NoteController.createNote);

// @desc Create note
NoteRoute.post(
  "/admin/notes",
  upload.array("uploadImages", 6),
  NoteController.createAdminNote
);

// @desc Update note by ID
NoteRoute.put("/notes/:id", NoteController.updateNote);

// @desc Delete note by ID
NoteRoute.delete("/notes/:id", NoteController.deleteAdminNote);

// @desc Delete note by ID
NoteRoute.put(
  "/admin/notes/:id",
  upload.array("uploadImages", 6),
  NoteController.updateAdminNote
);

export default NoteRoute;
