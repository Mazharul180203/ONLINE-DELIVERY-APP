import React from 'react';
import axios from "axios";
import {BASE_URL} from "../../config.js";

const UserLogout = () => {

    const token = localStorage.getItem('token');

   const response =   axios.post(`${BASE_URL}/users/logout`, {}, {
       headers: {
           authorization: `Bearer ${token}`
       }
   })
    console.log("Logout response :",response.data);
    if(response.data.status === 200){

        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return (
        <div>
            UserLogout
        </div>
    );
};

export default UserLogout;