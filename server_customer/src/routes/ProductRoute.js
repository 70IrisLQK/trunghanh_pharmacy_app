import ProductController from "../controllers/ProductController.js";
import express from "express";
import passport from "passport";
const ProductRoute = express.Router();

// @desc: Get all product
// @method: get
// @access: public
ProductRoute.get("/products", ProductController.getAllProduct);

// @desc: Get popular product
// @method: get
// @access: public
ProductRoute.get("/popular_products", ProductController.getPopularProduct);

// @desc: Get product by id
// @method: get
// @access: public
ProductRoute.get("/products/:id", ProductController.getProductById);

export default ProductRoute;