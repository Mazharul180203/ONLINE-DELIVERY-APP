import React, {useState} from 'react';
import deliveryIcon from "../images/deliveryIcon.png";
import {Link} from "react-router-dom";

const CaptainSignup = () => {
    const [captainDetails, setCaptainDetails] = useState({
        "email": "",
        "password": "",
        "firstName": "",
        "lastName": ""
    })

    const submitHandeller = (e) => {
        e.preventDefault();
        const user = {
            email: captainDetails.email,
            password: captainDetails.password,
            firstName: captainDetails.firstName,
            lastName: captainDetails.lastName

        }
        setCaptainDetails({email: "", password: "", firstName: "", lastName: ""})
        console.log(user);
    }
    return (
        <div className="flex flex-col justify-center items-center py-6 px-7">
            <div>
                <img className="w-16 mb-10" src={deliveryIcon} alt="Delivery Icon"/>
                <form onSubmit={submitHandeller} className="w-full">
                    <h3 className="text-base font-medium mb-2">What's your Captain Name</h3>
                    <div className="flex gap-4">
                        <input
                            className="bg-gray-200 mb-5 rounded px-4 py-2 border text-base placeholder:text-base w-full"
                            required
                            type="text"
                            value={captainDetails.firstName}
                            onChange={(e) => setCaptainDetails(
                                {...captainDetails, firstName: e.target.value})
                            }
                            placeholder="First Name"/>
                        <input
                            className="bg-gray-200 mb-5 rounded px-4 py-2 border text-base placeholder:text-base w-full"
                            required
                            type="text"
                            value={captainDetails.lastName}
                            onChange={(e) => setCaptainDetails(
                                {...captainDetails, lastName: e.target.value})
                            }
                            placeholder="Last Name"/>
                    </div>
                    <h3 className="text-base font-medium mb-2">Enter your email</h3>
                    <input
                        className="bg-gray-200 mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                        required
                        type="text"
                        value={captainDetails.email}
                        onChange={(e) => setCaptainDetails(
                            {...captainDetails, email: e.target.value})
                        }
                        placeholder="email@example.com"/>
                    <h3 className="text-base font-medium mb-2">Enter your password</h3>
                    <input
                        className="bg-gray-200 mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-base"
                        required
                        type="password"
                        value={captainDetails.password}
                        onChange={(e) => setCaptainDetails(
                            {...captainDetails, password: e.target.value}
                        )}
                        placeholder="password"/>
                    <button
                        className="bg-black text-white font-semibold rounded mb-3 px-4 py-2 border w-full text-base placeholder:text-base"
                        type="submit">Login
                    </button>
                    <p className="text-center">Already Have an Account?<Link to="/captainlogin"
                                                                             className="text-blue-500"> Login
                        here</Link></p>
                </form>
            </div>
            <div className="mt-40">
                <p className="text-[10px] leading-3">This site is protected by reCAPTCHA and the <span className="underline">Google Service Policies</span>
                    and <span className="underline">Terms and Policies</span>></p>
            </div>
        </div>
    );
};

export default CaptainSignup;