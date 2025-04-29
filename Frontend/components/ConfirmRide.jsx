import React from 'react';

const ConfirmRide = () => {
    return (
        <div>
            <h5 onClick={() => {
                props.setVehiclePanel(false);
            }} className="p-3 text-center absolute w-[93%] top-0"><i
                className="text-3xl fa-solid text-gray-500 fa-angle-down"></i></h5>
        </div>
    );
};

export default ConfirmRide;