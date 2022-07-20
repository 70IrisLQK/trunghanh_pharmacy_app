import { Strategy, ExtractJwt } from 'passport-jwt';
import dotenv from "dotenv";
dotenv.config();

// load up the user model
import User from "../models/user.js"

const ACCESS_TOKEN = process.env.ACCESS_SECRET_KEY

export const AuthPassport = (passport) => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: ACCESS_TOKEN,
    };
    passport.use(new Strategy(opts, (jwt_payload, done) => {
        User
            .findOne({ where: { username: jwt_payload.username } })
            .then((user) => { return done(null, user); })
            .catch((error) => { return done(error, false); });
    }));
}
