import React, {useState} from 'react';
import userIcon from "../images/user.jpg";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";


const UserLogin = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
      "email": "",
        "password": ""
    })

    const submitHandeller = async (e) => {
        e.preventDefault();
        const user = {
            email: userDetails.email,
            password: userDetails.password
        }

        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, user);
        if (res.status === 200) {
            const data = res.data;
            console.log("first name :",data);
            localStorage.setItem('token', data['token']);
            navigate('/home')
        }
        setUserDetails({email: "", password: ""})
        console.log(user);
    }
    return (
        <div className="flex flex-col justify-center items-center py-6 px-7">
            <div>
                <img className="w-12 mb-6" src={userIcon} alt="Delivery Icon"/>
                <form onSubmit={submitHandeller} className="w-full">
                    <h3 className="text-xl font-medium mb-2">what's your Email</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails(
                            {...userDetails, email: e.target.value})
                    }

                        placeholder="Enter your email"/>
                    <h3 className="text-xl font-medium mb-2">Enter password</h3>
                    <input
                        className="bg-gray-200 mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                        required
                        type="password"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails(
                            {...userDetails, password: e.target.value}
                        )}
                        placeholder="password"/>
                    <button
                        className="bg-black text-white font-semibold rounded mb-3 px-4 py-2 border w-full text-lg placeholder:text-base"
                        type="submit">Login
                    </button>
                    <p className="text-center">New Here?<Link to="/signup" className="text-blue-500">Create New Account</Link></p>
                </form>
            </div>
           <Link
               to="/captainlogin"
                className="bg-green-500 text-white font-semibold mt-20 px-4 py-2 rounded border w-full text-lg placeholder:text-base hover:bg-gray-700 text-center"
                type="submit">Sign in as Captain
            </Link>
        </div>
    );
};

export default UserLogin;

