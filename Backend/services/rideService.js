import {getDistance} from "./maps.service.js";
import {pool} from "../db.js";
import crypto from 'crypto';
export const getFare = async (pickup,destination)=> {
    if(!pickup || !destination) {
        throw new Error("Pickup and destination are required");
    }

    const distanceTime = await getDistance(pickup, destination);
    console.log("distanceTime :", distanceTime.distance);
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };



    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance / 1000) * perKmRate.auto) + ((distanceTime.duration / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance / 1000) * perKmRate.car) + ((distanceTime.duration / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance / 1000) * perKmRate.moto) + ((distanceTime.duration / 60) * perMinuteRate.moto))
    };

    return fare;
}

const getOTP = async (num) => {
    const otp = crypto.randomInt(Math.pow(10,num-1), Math.pow(10,num)).toString();
    return otp;
}

export const createRide = async ({user,pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error("User, pickup, destination and vehicle type are required");
    }
    const fare = await getFare(pickup, destination);
    const otp = await getOTP(6);
    const result = await pool.query(
        'INSERT INTO public.ridedetails (user_id, pickup, destination, fare,otp,status) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *;',
        [user, pickup, destination, fare[vehicleType], otp, "pending"]
    );
    return result.rows[0];
}
