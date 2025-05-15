import express from 'express';
const router = express.Router();
import * as authMiddleware from "../middleware/authMiddleware.js";
import { query } from "express-validator";
import * as mapController from "../controllers/mapController.js";

router.get('/get-coordinats',
query('address').isString().isLength({min: 3})
    ,authMiddleware.authUser,mapController.getCoordinates)

router.get('/get-distance-time',
query('origin').isString().isLength({min: 3}),
query('destination').isString().isLength({min: 3}),
authMiddleware.authUser,mapController.getDistanceTime)

export default router;