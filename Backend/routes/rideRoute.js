import express from "express";
const router = express.Router();
import {body} from "express-validator";
import * as rideController from "../controllers/rideController.js";
import * as authmiddleware from "../middleware/authMiddleware.js";

router.post('/create',
    authmiddleware.authUser,
    body('pickup').isString().isLength({min: 3}).withMessage('Invalid pickup'),
    body('destination').isString().isLength({min: 3}).withMessage('Invalid destination'),
    body('vehicleType').isString().isLength({min: 3}).withMessage('Invalid vehicleType'),
    rideController.createRide
    )

export default router;
