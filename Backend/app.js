import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import bodyParser from "express";


const app = express();
app.use(cors());

app.use(cookieParser());
app.use(bodyParser.json())

app.use('/users', router);
app.use('/captains', router);

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;