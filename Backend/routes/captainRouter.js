import express from 'express';
const router = express.Router();
import {body} from "express-validator";
import * as captainController from "../controllers/captainController.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

router.post('/register',[
    body('email').isEmail().withMessage('Email is required'),
    body('firstName').isLength({min:3}).withMessage('At least 3 characters long'),
    body('password').isLength({min:5}).withMessage('Password is required'),
    body('lastName').isLength({min:3}).withMessage('At least 3 characters long'),
    body('vehicleplate').isLength({min:3}).withMessage('At least 3 characters long'),
    body('capacity').isLength({min:1}).withMessage('At least 1 characters long'),
    body('vehicletype').isLength({min:3}).withMessage('At least 3 characters long'),

],
    captainController.registerCaptain
)

router.post('/login',[
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min:6}).withMessage('Password is required'),
],
    captainController.loginCaptain
)

router.get('/profile', authMiddleware.authCaptain,captainController.getCaptainProfile)
router.post('/logout', authMiddleware.authCaptain, captainController.logoutCaptain)


export default router;