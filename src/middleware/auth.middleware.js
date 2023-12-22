import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";
import config from "../config/index.js";


export const isLoggedIn = asyncHandler(async(req, res, next) => {
    let token;

    if (req.cookie.token || req.header.authorization || req.header.authorization.startsWith("Bearer")) {
        token = req.cookie.token || req.header.authorization.split(" ")[1];
    }

    if (!token) {
        throw new CustomError("Unauthorized user !", 400);
    }

    try {
        const decodedJWTtoken = JWT.verify(token, config.JWT_SECRET);
        req.user = await User.findById(decodedJWTtoken._id, "name email role");
        next();
    } catch (error) {
        throw new CustomError("Unauthorized user !", 400);
    }

})

export const authorize = (...requiredRoles) => asyncHandler( async(req, res, next) => {

    if (!requiredRoles.includes(req.user.role)) {
        throw new CustomError("You are not authorized to access", 400)
    }
    next();

})