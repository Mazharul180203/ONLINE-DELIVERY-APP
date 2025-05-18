import React from 'react';
import axios from "axios";

const UserLogout = () => {

    const token = localStorage.getItem('token');

   const response =   axios.post(`${import.meta.env.VITE_BASE_URL}/users/logout`, {}, {
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