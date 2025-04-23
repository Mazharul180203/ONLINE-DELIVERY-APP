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
