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

}