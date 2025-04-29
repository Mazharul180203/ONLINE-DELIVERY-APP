import React from 'react';

const LocationSearchPanel = (props) => {
   const locations = [
       "12A, Dhaka, Banani",
       "45C, Dhaka, Dhanmondi",
       "78D, Dhaka, Uttara",
       "90E, Dhaka, Mirpur",
       "34F, Dhaka, Mohammadpur"
   ];

   return (
       <div className="px-6">
           {locations.map((location, index) => (
               <div
                   key={index}
                   onClick={() => {
                       props.setVehiclePanel(true);
                       props.setPanelOpen(false);
                   }}
                   className="flex items-center border-2 p-2 rounded-xl my-4 border-white active:border-black justify-start gap-4"
               >
                   <h2 className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full">
                       <i className="fa-solid fa-location-dot"></i>
                   </h2>
                   <h4 className="text-lg font-medium">{location}</h4>
               </div>
           ))}
       </div>
   );
};

export default LocationSearchPanel;