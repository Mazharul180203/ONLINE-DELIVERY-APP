import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import bodyParser from "express";
import userRoutes from "./routes/userRoutes.js";
import captainRoutes from "./routes/captainRouter.js";
import mapRoutes from "./routes/mapsRouts.js";
import rideRoutes from "./routes/rideRoute.js";

const app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json())

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapRoutes);
app.use('/rides', rideRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
})


export default app;