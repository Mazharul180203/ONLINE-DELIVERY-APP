import {pool} from "../db.js";

export const createCaptain = async ({firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType, vehiclecolor}) => {
    console.log(firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType, vehiclecolor);
    if (!firstName || !lastName || !hashPassword || !email || !vehicleplate || !capacity || !vehicleType || !vehiclecolor) {
        throw new Error("All fields are required");
    }
    try {
        const isCaptainAlreadyExist = await pool.query(
            'SELECT * FROM captaindetails WHERE email = $1',
            [email]
        );

        if (isCaptainAlreadyExist.rows.length > 0) {
            throw new Error("Captain already exists");
        }

        const result = await pool.query(
            'INSERT INTO public.captaindetails (firstName, lastName, email, password, vehicleplate, capacity, vehicleType, vehiclecolor) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
            [firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType, vehiclecolor]
        );
        console.log("result :", result.rows);
        return { code: 201, status: "success", message: "Successfully Registered", data: result.rows };
    } catch (err) {
        console.error("error :", err.message)
        return { code: 401, status: "error", message: err.message };
    }
};

export const captainLogin = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error("All fields are required");
    }
    try {
        const result = await pool.query(
            'SELECT * FROM captaindetails WHERE email = $1',
            [email]
        );
        return { code: 200, status: "success", message: "Get the data", data: result.rows };
    } catch (err) {
        return { code: 401, status: "error", message: err.message };
    }
}

export const findCaptainById = async (id) => {
    if (!id) {
        throw new Error("All fields are required");
    }
    try {
        const result = await pool.query(
            'SELECT * FROM captaindetails WHERE id = $1',
            [id]
        );
        return { code: 200, status: "success", message: "Get the data", data: result.rows };
    } catch (err) {
        return { code: 401, status: "error", message: err.message };
    }
}

export const checkCaptainBlacklistToken = async (token) => {
    if (!token) {
        throw new Error("All fields are required");
    }
    try {
        const result = await pool.query(
            'SELECT * FROM captainblacklisttoken WHERE token = $1',
            [token]
        );
        return { code: 200, status: "success", message: "Get the data", data: result.rows };
    } catch (err) {
        return { code: 401, status: "error", message: err.message };
    }
}

export const setCaptainTokenBlacklist = async (token) => {
    if (!token) {
        throw new Error("Token is required");
    }
    try {
        const result = await pool.query(
            'INSERT INTO blaklistedtokens (token, expires_at) VALUES ($1,$2)',
            [token, new Date(Date.now() + 24 * 60 * 60 * 1000)]
        );
        return { code: 200, status: "success", message: "Token blacklisted successfully", data: result.rows };
    } catch (err) {
        return { code: 401, status: "error", message: err.message };
    }
}