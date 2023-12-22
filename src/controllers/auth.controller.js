import User from "../models/user.schema.js"
import asyncHandler from "../service/asyncHandler.js";
import CustomError from "../service/customError.js";

export const CookieOptions = {
    expires: new Date(Date.now() + 3*24*60*60*1000),
    httpOnly: true
}

export const SignUp = asyncHandler( async (req, res) => {
    //get data from user
    const{name, email, password} = req.body;

    //validation
    if (!name || !email || !password) {
        throw new CustomError("Please fill all the fields", 400)
    }
    if (password.length<8) {
        throw new CustomError("Password must be 8 chars long", 400)
    }

    //add user to database

    //check if the user already exists or not
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new CustomError("User already exists", 400);
    }

    const user = await User.create({
        name,
        email,
        password
    })

    const token = user.getJWTtoken();
    //safety
    user.password = undefined;

    res.cookie("token", token, CookieOptions)

    //send back a response to user
    res.status(200).json({
        success: true,
        token,
        user
    })
})

export const Login = asyncHandler(async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new CustomError("Provide email and password", 400)
    }

    const user = User.findOne({email}).select("+password");

    if (!user) {
        throw new CustomError("Invalid credentials", 400)
    }

    const isPasswordMatched = await user.comparePassword(password)

    if (isPasswordMatched) {
        const token = user.getJWTtoken();
        user.password = undefined;
        res.cookie("token", token, CookieOptions)
        res.status(200).json({
            success: true,
            token,
            user
        })
    }

    throw new CustomError("Incorrect password", 400)
})

export const Logout = asyncHandler(async(req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success:true,
        message: "Logged Out"
    })
})

export const getProfile = asyncHandler(async (req, res) => {
    const {user} = req;

    if (!user) {
        throw new CustomError("user not found", 400);
    }

    res.status(200).json({
        success: true,
        user
    })
})