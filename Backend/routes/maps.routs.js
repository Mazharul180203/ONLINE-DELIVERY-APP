import express from 'express';
const router = express.Router();
import * as authMiddleware from "../middleware/authMiddleware.js";
import { query } from "express-validator";
import * as mapController from "../controllers/mapController.js";

router.get('/get-coordinats',
query('address').isString().isLength({min: 3})
    ,authMiddleware.authUser,mapController.getCoordinates)

export default router;