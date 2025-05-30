import * as mapService from '../services/maps.service.js';
import {validationResult} from "express-validator";

export const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    console.log("address : ", address);
    if (!address) {
        return res.status(400).json({ message: "Address is required" });
    }
    try {
        const coordinates = await mapService.getAddressCoordinates(address);
        console.log("coordinates : ", coordinates);
        return res.status(200).json(coordinates);
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return res.status(404).json({ message: "Coordinate not found" });
    }
}
export const getDistanceTime = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    console.log("origin : ", origin);
    console.log("destination : ", destination);
    if (!origin || !destination) {
        return res.status(400).json({ message: "Origin and destination are required" });
    }
    try {
        const distance = await mapService.getDistance(origin, destination);
        console.log("distance : ", distance);
        return res.status(200).json(distance);
    } catch (error) {
        console.error("Error fetching distance:", error);
        return res.status(404).json({ message: "Distance not found" });
    }
}
export const getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { input } = req.query;
    
    if (!input) {
        return res.status(400).json({ message: "Input is required" });
    }
    try {
        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        
        return res.status(200).json(suggestions);
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return res.status(404).json({ message: "Suggestions not found" });
    }
}