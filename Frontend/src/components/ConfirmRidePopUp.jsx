import React, {useState} from 'react';
import {Link} from "react-router-dom";

const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        console.log('OTP submitted');
    }
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopUpPanel(false);
            }} className="p-3 text-center absolute w-[93%] top-0"><i
                className="text-3xl fa-solid text-gray-500 fa-angle-down"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Confirm this ride to start</h3>
            <div className="flex items-center bg-yellow-400 p-3 rounded-lg justify-between">
                <div className="flex items-center gap-3 ">
                    <img className="h-12 w-10 rounded-full object-cover"
                         src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
                         alt=""/>
                    <h2 className="text-lg font-medium ">Mazharul Islam</h2>
                </div>
                <h5 className="text-lg font-semibold">2.2 KM</h5>
            </div>
            <div className="flex justify-center flex-col items-center">
                {/*<img src={carIcon} alt="car image"/>*/}
                <div className="w-full mt-5">
                    <div className="flex items-center p-3 border-b-2">
                        <i className="fa-solid fa-location-dot mr-4"></i>
                        <div>
                            <h3 className="text-lg font-medium">63/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Dhaka, Banani</p>
                        </div>
                    </div>
                    <div className="flex items-center p-3 border-b-2">
                        <i className="fa-regular fa-person mr-4"></i>
                        <div>
                            <h3 className="text-lg font-medium">63/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Dhaka, Banani</p>
                        </div>
                    </div>
                    <div className="flex items-center p-3 border-b-2">
                        <i className="fa-solid fa-money-check-dollar mr-4"></i>
                        <div>
                            <h3 className="text-lg font-medium">63/11-A</h3>
                            <p className="text-sm -mt-1 text-gray-600">Dhaka, Banani</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>
                        <input
                            value={otp}
                            onChange={(e)=>
                                setOtp(e.target.value)}
                            type="text"
                           className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
                           placeholder='Enter OTP'/>

                        <Link to='/captain-riding'
                            className='w-full mt-5 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm
                        </Link>
                        <button onClick={() => {
                            props.setConfirmRidePopUpPanel(false);
                            props.setRidePopUpPanel(false);

                        }} className='w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;