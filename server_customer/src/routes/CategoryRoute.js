import CategoryController from "../controllers/CategoryController.js";
import express from "express";

const CategoryRoute = express.Router();

// @desc: Get all category
// @method: get
// @access: public
CategoryRoute.get("/categories", CategoryController.getAllCategory);

// @desc: Get category by id
// @method: get
// @access: public
CategoryRoute.get("/categories/:id", CategoryController.getCategoryById);

export default CategoryRoute;