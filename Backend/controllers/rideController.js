import {validationResult} from "express-validator";
import * as rideService from "../services/rideService.js";


export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   const {pickup, destination, vehicleType} = req.body;
    try {
        console.log("userID :", req.user.id);
        const ride = await rideService.createRide({user:req.user.id, pickup, destination, vehicleType});
        return res.status(201).json({message: "Ride created successfully", ride});
    } catch (error) {
        console.error("Error creating ride:", error);
        return res.status(500).json({error: "Internal server error"});
    }

}

export const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {pickup, destination} = req.query;
    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json({message: "Fare fetched successfully", fare});
    } catch (error) {
        console.error("Error fetching fare:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}