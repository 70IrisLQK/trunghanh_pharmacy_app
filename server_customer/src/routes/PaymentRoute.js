import PaymentController from "../controllers/PaymentController.js";
import express from "express";

const PaymentRoute = express.Router();

// @desc: Get all payment
// @method: get
// @access: public
PaymentRoute.get("/payments", PaymentController.getAllPayment);

// @desc: Get payment by id
// @method: get
// @access: public
PaymentRoute.get("/payments/:id", PaymentController.getPaymentById);

// @desc: Get payment by id
// @method: get
// @access: public
PaymentRoute.post("/payments", PaymentController.createPayment);

export default PaymentRoute;