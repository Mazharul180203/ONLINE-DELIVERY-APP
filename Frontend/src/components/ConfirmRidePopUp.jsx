import React from 'react';

const ConfirmRidePopUp = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setRidePopUpPanel(false);
            }} className="p-3 text-center absolute w-[93%] top-0"><i
                className="text-3xl fa-solid text-gray-500 fa-angle-down"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">New Ride Available</h3>
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
                <button onClick={() => {

                }}
                        className="w-full mb-3 bg-green-600 text-black font-semibold p-2 rounded">Confirm
                </button>
                <button onClick={() => {
                    props.setRidePopUpPanel(false);
                }} className="w-full bg-gray-400 text-gray-700 font-semibold p-2 rounded">Ignore
                </button>
            </div>
        </div>
    );
};

export default ConfirmRidePopUp;