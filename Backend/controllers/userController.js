import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import userService from "../services/userService.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res, next) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userService({firstName, lastName, email, hashPassword});
    console.log("user : ",user);
    const userID = user.data[0].id;
    console.log("userid : ",userID);
    const token = jwt.sign(userID, process.env.JWT_SECRET)

    return res.status(201).json({token, user});

}
