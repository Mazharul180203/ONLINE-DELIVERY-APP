import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {createCaptain} from "../services/captainService.js";

export const registerCaptain = async (req, res) => {
    const errors  =validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstName, lastName, email, password, vehicleplate, capacity, vehicleType} = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const captain = await createCaptain({firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType});
    console.log("captain : ",captain);
    const captainID = captain.data[0].id;
    console.log("captainid : ",captainID);
    const token = jwt.sign(captainID, process.env.JWT_SECRET)

    return res.status(201).json({token, captain});

}