import {pool} from "../db.js";

export const  createUser =async({firstName, lastName, email, hashPassword})=>{
    console.log(firstName, lastName, email, hashPassword)
    if(!firstName || !lastName || !hashPassword || !email){
        throw new Error("All files are required");
    }
    try{
        const isUserAlreadyExist = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if(isUserAlreadyExist.rows.length > 0){
            throw new Error("User already exists");
        }

        const result = await pool.query(
            'INSERT INTO users (firstname,lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING *;',
            [firstName, lastName, email, hashPassword]
        );
        console.log("result :", result);
        return { code: 201, status:"success", message: "Successfully Registered", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}

export const checkLogin = async({email, password}) => {
    if(!email || !password){
        throw new Error("All fields are required");
    }
    try{
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return { code: 200, status:"success", message: "Get the data", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}

export const findUserById = async (id) => {
    if(!id){
        throw new Error("All fields are required");
    }
    try{
        const result = await pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );
        return { code: 200, status:"success", message: "Get the data", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}

export const setTokenBlacklist = async (token) => {
    if(!token){
        throw new Error("Token are required");
    }
    try{
        const result = await pool.query(
            'INSERT INTO blaklistedtokens (token, expires_at) VALUES ($1,$2)',
            [token, new Date(Date.now() + 24 * 60 * 60 * 1000)]
        );
        return { code: 200, status:"success", message: "Get the data", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}


export const checkBlackListToken = async (token) => {
    if(!token){
        throw new Error("Token are required!");
    }
    try{
        const result = await pool.query(
            'SELECT * FROM blaklistedtokens WHERE token = $1',
            [token]
        );
        return { code: 200, status:"success", message: "Get the data", data: result.rows };
    }catch(err){
        return {code:401, status:"error", message:err.message};
    }
}


