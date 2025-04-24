import React from 'react';
import deliveryIcon from "../images/deliveryIcon.png";
import {Link} from "react-router-dom";

const UserLogin = () => {

    return (
        <div className="flex flex-col justify-center items-center py-6 px-7">
            <div>
                <img className="w-16 mb-10" src={deliveryIcon} alt="Delivery Icon"/>
                <form className="w-full">
                    <h3 className="text-xl font-medium mb-2">what's your Email</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        placeholder="Enter your email"/>
                    <h3 className="text-xl font-medium mb-2">Enter password</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        placeholder="password"/>
                    <button
                        className="bg-black text-white font-semibold mb-3 px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="submit">Login
                    </button>
                    <p className="text-center">New Here?<Link to="/signup" className="text-blue-500">Create New Account</Link></p>
                </form>
            </div>
            <button
                className="bg-green-500 text-white font-semibold mt-20 px-4 py-2 border w-full text-lg placeholder:text-base hover:bg-gray-700"
                type="submit">Sign in as Captain
            </button>
        </div>
    );
};

export default UserLogin;

