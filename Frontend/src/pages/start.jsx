import React from 'react';
import deliveryIcon from '../images/deliveryIcon.png'; // Import the image
import foodIcon from '../images/foodIcon.jpg';
import {Link} from "react-router-dom";

const Start = () => {
    return (
        <div>
            <div
                className="h-screen pt-5 flex justify-between flex-col w-full"
                style={{ backgroundImage: `url(${foodIcon})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                <img className="w-20 ml-8" src={deliveryIcon} alt="Delivery Icon"/>
                <div className="bg-white pb-7 py-4 px-4">
                    <h1 className="text-3xl justify-center text-center font-bold"> Delivery app</h1>
                    <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
                </div>
            </div>
        </div>
    );
};

export default Start;
