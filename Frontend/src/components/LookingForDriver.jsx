import React from 'react';

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehicleFound(false);
            }} className="p-3 text-center absolute w-[93%] top-0"><i
                className="text-3xl fa-solid text-gray-500 fa-angle-down"></i></h5>
            <h3 className="text-2xl font-semibold mb-5">Looking for a Driver</h3>
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
            </div>
        </div>
    );
};

export default LookingForDriver;