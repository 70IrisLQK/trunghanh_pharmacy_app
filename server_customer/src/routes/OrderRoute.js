import OrderController from "../controllers/OrderController.js";
import express from "express";
import passport from "passport";
const OrderRoute = express.Router();

// @desc: Create order pharmacy
// @method: post
// @access: private
OrderRoute.post("/orders", OrderController.placeOrder);

OrderRoute.post("/sale_orders", OrderController.placeOrderSales);

// @desc: Get order pharmacy
// @method: post
// @access: private
OrderRoute.get("/order_detail/:id", OrderController.getOrderDetail);

// @desc: Get Order by order id
// @method: get
// @access: private
OrderRoute.get("/orders/:id", OrderController.getOrderById);

// @desc: Get Order by order id
// @method: get
// @access: private
OrderRoute.get("/admin/orders/:id", OrderController.getOrderByOrderId);

// @desc: Get all orders
// @method: get
// @access: private
OrderRoute.get("/orders", OrderController.getAllOrder);

// @desc: Get count order status
// @method: get
// @access: private
OrderRoute.get("/order_count", OrderController.getAllOrderStatusCount);

// @desc: Get count order status
// @method: get
// @access: private
OrderRoute.get("/order_status", OrderController.getOrderStatus);

// @desc: Update order status
// @method: post
// @access: private
OrderRoute.put("/orders/:id", OrderController.updateOrder);

// @desc: Update order status
// @method: post
// @access: private
OrderRoute.put("/update_order/:id", OrderController.updateAccountantOrder);

// @desc: Delete order
// @method: delete
// @access: private
OrderRoute.delete("/orders/:id", OrderController.deleteOrder);

export default OrderRoute;
