import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js"
import dotenv from "dotenv"
dotenv.config();

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            req.user = await User.findOne({ where: { user_id: decoded.id } });
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

const admin = (req, res, next) => {
    if (req.user && req.user.role_id === "94C7AFC2-1B38-4D3D-9851-3A1419016AE3") {
        next();
    } else {
        res.status(401);
        throw new Error("Not authorized as an Admin");
    }
};
export { protect, admin };
