import TransactionController from "../controllers/TransactionController.js";
import express from "express";

const TransactionRoute = express.Router();

// @desc Get all note_type
TransactionRoute.get("/transactions", TransactionController.getAllTransaction);

// @desc Get note by ID
TransactionRoute.get(
  "/transactions/:id",
  TransactionController.getTransactionByOrderId
);

TransactionRoute.get(
  "/transactions/user/:id",
  TransactionController.getTransactionByUserId
);

export default TransactionRoute;
