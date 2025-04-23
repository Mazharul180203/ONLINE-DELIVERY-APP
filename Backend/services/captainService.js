import {pool} from "../db.js";

export const  createCaptain =async({firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType})=>{
    console.log(firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType)
    if(!firstName || !lastName || !hashPassword || !email || !vehicleplate || !capacity || !vehicleType){
        throw new Error("All files are required");
    }
    try{
        const isCaptainaleradyexist = await pool.query(
            'SELECT * FROM captaindetails WHERE email = $1',
            [email]
        );

        if(isCaptainaleradyexist.rows.length > 0){
            throw new Error("Captain already exists");
        }

        const result = await pool.query(
            'INSERT INTO captaindetails(firstname, lastname, password, email, socketid, vehiclecolor, vehicleplate, capacity, vehicletype, latitude, longitude) VALUES ($1, $2, $3, $4,$5,$6,$7) RETURNING *;',
            [firstName, lastName, email, hashPassword, vehicleplate, capacity, vehicleType]
        );
        console.log("result :", result);
        return { code: 201, status:"success", message: "Successfully Registered", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}