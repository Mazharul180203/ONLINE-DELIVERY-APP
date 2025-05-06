import React from 'react';
import mapIcon from "../images/map_images.png";

const Riding = () => {
    return (
        <div className='h-screen'>

            <div className="h-1/2">
                <img className="h-full w-full object-cover" src={mapIcon} alt=""/>
            </div>
            <div className="h-1/2 p-4">
                <div className='flex items-center justify-between'>
                    <img className='h-12'
                         src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt=""/>
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize'>Md Mazharul Islam</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>test</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                        <h1 className='text-lg font-semibold'></h1>
                    </div>
                </div>
                <div className="flex justify-center flex-col items-center">

                    <div className="w-full mt-5">
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
                <button className="w-full text-white  bg-green-600 font-semibold p-2 rounded">Make a Payment
                </button>
            </div>
        </div>
    );
};

export default Riding;