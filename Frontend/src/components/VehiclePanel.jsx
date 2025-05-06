import React from 'react';
import carIcon from "../images/car.webp";

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false);
            }} className="p-3 text-center absolute w-[93%] top-0"><i
                className="text-3xl fa-solid text-gray-500 fa-angle-down"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Choose the Vehicle</h3>
            <div onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
                className="flex border-2 active:border-black rounded-xl bg-gray-100 mb-2 w-full p-3 items-center justify-between">
                <img className="h-12" src={carIcon} alt="car image"/>
                <div className="w-1/2">
                    <h4 className="font-medium text-lg">UbarX <span><i
                        className="fa-solid fa-user"></i>4</span></h4>
                    <h5 className="font-medium text-lg">5 min away</h5>
                    <p className="font-normal text-xs text-gray-600">Luxury rides for special occasions</p>
                </div>
                <h2 className="text-xl font-semibold">$35.50</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
                className="flex border-2 rounded-xl active:border-black bg-gray-100 mb-2 w-full p-3 items-center justify-between">
                <img className="h-12" src={carIcon} alt="car image"/>
                <div className="w-1/2">
                    <h4 className="font-medium text-lg">UbarXL <span><i
                        className="fa-solid fa-user"></i>6</span></h4>
                    <h5 className="font-medium text-lg">3 min away</h5>
                    <p className="font-normal text-xs text-gray-600">Spacious rides for groups</p>
                </div>
                <h2 className="text-xl font-semibold">$28.75</h2>
            </div>
            <div onClick={()=>{
                props.setConfirmRidePanel(true);
            }}
                className="flex border-2 rounded-xl active:border-black bg-gray-100 mb-2 w-full p-3 items-center justify-between">
                <img className="h-12" src={carIcon} alt="car image"/>
                <div className="w-1/2">
                    <h4 className="font-medium text-lg">UbarEco <span><i
                        className="fa-solid fa-user"></i>4</span></h4>
                    <h5 className="font-medium text-lg">1 min away</h5>
                    <p className="font-normal text-xs text-gray-600">Eco-friendly, budget rides</p>
                </div>
                <h2 className="text-xl font-semibold">$15.20</h2>
            </div>

        </div>
    );
};

export default VehiclePanel;