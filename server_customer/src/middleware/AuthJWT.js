import jwt from "jwt"
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getDataValue("role_id").then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].role_id === "94C7AFC2-1B38-4D3D-9851-3A1419016AE3") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Sales Role!"
            });
        });
    });
};
isUser = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getDataValue("role_id").then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].role_id === "810FBD0F-6009-46DB-B8E1-65E232FF16F9") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Sales Role!"
            });
        });
    });
};
isSales = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getDataValue("role_id").then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].role_id === "A54FA54C-04A8-4C56-9993-1ECC797DA1A4") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "Require Sales Role!"
            });
        });
    });
};

const AuthJWT = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isUser: isUser,
    isSales: isSales
};

export default AuthJWT