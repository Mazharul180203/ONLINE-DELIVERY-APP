import express from 'express';
import * as userController from "../controllers/userController.js";
const router = express.Router();
import {body} from "express-validator";


router.post('/register',[
    body('email').isEmail().withMessage('Email is required'),
    body('firstName').isLength({min:3}).withMessage('At least 3 characters long'),
    body('password').isLength({min:6}).withMessage('Password is required'),
],
    userController.registerUser
)

export default router;