import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash } from 'bcrypt'

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
        if (existingUser) 
            return res.status(401).send("email already in use");
        const hashedPassword = await hash(password, 10);
        const user = new User({name, email, hashedPassword});
        await user.save();
        return res.status(200).json({message: "ok", id: user._id.toString() });

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
        /*const hashedPassword = await hash(password, 10);
        const user = new User({name, email, hashedPassword});
        await user.save();
        return res.status(200).json({message: "ok", id: user._id.toString() });*/

    } catch (error) {
        console.log(error)
        return res.status(200).json({message: "ERROR", cause: error.message });
    }

};