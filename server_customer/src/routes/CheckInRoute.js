import CheckInController from "../controllers/CheckInController.js";
import express from "express";
import { upload } from "../utils/UploadImage.js";

const CheckInRoute = express.Router();

// @desc Chẹck in
CheckInRoute.post("/check_in", upload.array("image", 6), CheckInController.checkIn);

export default CheckInRoute;
