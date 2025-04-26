import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {captainLogin, createCaptain, setCaptainTokenBlacklist} from "../services/captainService.js";

export const registerCaptain = async (req, res) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        console.log("errors : ", errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password, vehicleplate, capacity, vehicletype, vehiclecolor} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const captain = await createCaptain({firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicletype, vehiclecolor});
    if(captain.code === 401){
        return res.status(captain.code).json({message: captain.message});
    }
    console.log("captain : ",captain);
    const captainID = captain.data[0].id;
    console.log("captainid : ",captainID);
    const token = jwt.sign(captainID, process.env.JWT_SECRET_CAPTAIN)

    return res.status(201).json({token, captain});

}

export const loginCaptain = async (req, res) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const {email, password} = req.body;
    const captain = await captainLogin({email, password});
    if(!captain){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const isMatch = await bcrypt.compare(password, captain.data[0].password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid email or password"});
    }
    const token = jwt.sign({ id: captain.data[0].id }, process.env.JWT_SECRET_CAPTAIN,{expiresIn: '24h'})
    res.cookie('token', token);
    return res.status(200).json({token, captain});
}

export const getCaptainProfile = async (req, res) => {
    res.status(200).json({captain: req.user});
}

export const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    console.log("backlist token : ", token);
    const sendtoken = await setCaptainTokenBlacklist(token);
    if(!sendtoken){
        return res.status(401).json({message:"Blacklisted token is not set"});
    }
    res.clearCookie('token');
    return res.status(200).json({message:"Successfully logged out"});
}