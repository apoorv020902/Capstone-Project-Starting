import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash,compare } from 'bcrypt'
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        //get all users
        const users = await User.find();
        return res.status(200).json({message: "ok", users});

    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message });
    }

};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        //signing upo the users
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).send("email already in use")};
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, hashedPassword});
        await user.save();

        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",   //change during deployement
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",   //change during deployement
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({message: "ok", id: user._id.toString() });

    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message });
    }

};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        //logging in the user
        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (!user){
            return res.status(401).send("User not found");
        }
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",   //change during deployement
            httpOnly: true,
            signed: true,
        })

        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",   //change during deployement
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({message: "ok", id: user._id.toString() });

        /*const hashedPassword = await hash(password, 10);
        const user = new User({name, email, hashedPassword});
        await user.save();
        return res.status(200).json({message: "ok", id: user._id.toString() });*/

    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message });
    }

};