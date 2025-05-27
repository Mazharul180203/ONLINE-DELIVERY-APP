import {validationResult} from "express-validator";
import * as rideService from "../services/rideService.js";
import * as mapService from '../services/maps.service.js';
import {sendMessageToSocketId} from "../socket.js";

export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
   const {pickup, destination, vehicleType} = req.body;
    try {
        console.log("userID :", req.user.id);
        const ride = await rideService.createRide({user:req.user.id, pickup, destination, vehicleType});
        console.log("ridedetails :", ride);
        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const captainInRadious = await mapService.getCaptanInThisRadious(pickupCoordinates.lat, pickupCoordinates.lng, 2000);
        ride.otp="";
        const rideWithUser = await rideService.getRideWithUser(ride.id);
        captainInRadious.map(captain => { 
             sendMessageToSocketId(captain.socketid, {
                event: 'new-ride',
                data: rideWithUser
            })
        });
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

export const confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const {rideId} = req.body;
    console.log("rideId :", rideId);
    console.log("captainId :", req.captain.id);
    try {
        const ride = await rideService.confirmRide(rideId, req.captain.id);
        if (!ride) {
            return res.status(404).json({message: "Ride not found"});
        }
        console.log("ride :", ride);
        sendMessageToSocketId(ride.socketid, {
            event: 'ride-confirmed',
            data: ride
        });
        return res.status(200).json({message: "Ride confirmed successfully", ride});
    } catch (error) {
        console.error("Error confirming ride:", error);
        return res.status(500).json({error: "Internal server error"});
    }
}