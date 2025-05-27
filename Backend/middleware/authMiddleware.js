import jwt from 'jsonwebtoken';
import {checkBlackListToken, findUserById} from "../services/userService.js";
import {checkCaptainBlacklistToken, findCaptainById} from "../services/captainService.js";


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await checkBlackListToken(token);
    if(isBlacklisted.data.length > 0){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded.id);
        req.user = user.data[0];
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

export const authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const isBlacklisted = await checkCaptainBlacklistToken(token);
    if(isBlacklisted.data.length > 0){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CAPTAIN);
        console.log("decoded :", decoded);
        const captain = await findCaptainById(decoded.id);
        console.log("captain :", captain);
        req.captain = captain.data[0];
        console.log("req.captain :", req.captain);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}