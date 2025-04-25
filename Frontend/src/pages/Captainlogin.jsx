import React, {useState} from 'react';
import deliveryIcon from "../images/deliveryIcon.png";
import {Link} from "react-router-dom";

const Captainlogin = () => {
    const [captainDetails, setCaptainDetails] = useState({
        "email": "",
        "password": ""
    })

    const submitHandeller = (e) => {
        e.preventDefault();
        const user = {
            email: captainDetails.email,
            password: captainDetails.password
        }
        setCaptainDetails({email: "", password: ""})
        console.log(user);
    }
    return (
        <div className="flex flex-col justify-center items-center py-6 px-7">
            <div>
                <img className="w-16 mb-10" src={deliveryIcon} alt="Delivery Icon"/>
                <form onSubmit={submitHandeller} className="w-full">
                    <h3 className="text-xl font-medium mb-2">what's your Email</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        value={captainDetails.email}
                        onChange={(e) => setCaptainDetails(
                            {...captainDetails, email: e.target.value})
                        }

                        placeholder="Enter your email"/>
                    <h3 className="text-xl font-medium mb-2">Enter password</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        value={captainDetails.password}
                        onChange={(e) => setCaptainDetails(
                            {...captainDetails, password: e.target.value}
                        )}
                        placeholder="password"/>
                    <button
                        className="bg-black text-white font-semibold rounded mb-3 px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="submit">Login
                    </button>
                    <p className="text-center">Join a fleet?<Link to="/captainsignup" className="text-blue-500">Register as a Captain</Link></p>
                </form>
            </div>
            <Link
                to="/captainlogin"
                className="bg-amber-500 text-white font-semibold mt-40 px-4 py-2 rounded border w-full text-lg placeholder:text-base hover:bg-gray-700 text-center"
                type="submit">Sign in as User
            </Link>
        </div>
    );
};

export default Captainlogin;