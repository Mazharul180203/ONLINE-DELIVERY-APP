import jwt from 'jsonwebtoken';
import {findUserById} from "../services/userService.js";


export const authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    console.log("token : ", token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await findUserById(decoded);
        req.user = user.data[0];
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}