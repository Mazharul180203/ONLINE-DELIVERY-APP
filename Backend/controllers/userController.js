import {validationResult} from "express-validator";
import bcrypt from "bcrypt";
import {createUser, checkLogin, setTokenBlacklist} from "../services/userService.js";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser({firstName, lastName, email, hashPassword});
    if(user.code === 401){
        return res.status(user.code).json({message: user.message});
    }
    console.log("user : ",user);
    const userID = user.data[0].id;
    console.log("userid : ",userID);
    const token = jwt.sign(userID, process.env.JWT_SECRET)

    return res.status(201).json({token, user});

}
export const loginUser = async (req, res) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const user = await checkLogin({email, password});
    if(!user){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch = await bcrypt.compare(password, user.data[0].password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token = jwt.sign({ id: user.data[0].id }, process.env.JWT_SECRET,{expiresIn: '24h'})
    res.cookie('token', token);
    return res.status(200).json({token, user});
}

export const getUserProfile = async (req, res) => {
    res.status(200).json({user: req.user});
}

export const logoutUser = async (req, res) => {

    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    console.log("backlist token : ", token);
    const sendtoken = await setTokenBlacklist(token);
    if(!sendtoken){
        return res.status(401).json({message:"Blacklisted token is not set"});
    }
    res.clearCookie('token');

    return res.status(200).json({message: "Logout successfully"});
}