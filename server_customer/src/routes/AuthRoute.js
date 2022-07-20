import express from "express";
import passport from "passport";
import AuthController from "../controllers/AuthController.js";

const AuthRoute = express.Router();

// @desc: Get user by id
// @method: get
// @access: private
AuthRoute.get(
  "/users/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  AuthController.getUserById
);

// @desc: User login
// @method: post
// @access: public
AuthRoute.post("/auth/login", AuthController.login);

// @desc: User register
// @method: post
// @access: private
AuthRoute.post("/auth/register", AuthController.register);

// @desc: User update profile
// @method: post
// @access: private
AuthRoute.put("/user/:id", AuthController.updateUser);

// @desc: Get all user
// @method: get
// @access: private
AuthRoute.get("/users", AuthController.getAllUserPharmacy);

AuthRoute.get("/user_sales", AuthController.getAllUserSales);


export default AuthRoute;
