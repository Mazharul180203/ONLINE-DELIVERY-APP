import React from 'react';

const LocationSearchPanel = () => {
    return (
        <div className="px-6">
            {/*this is the sample data*/}
            <div className="flex items-center my-2 justify-start gap-4">
                <h2 className="bg-gray-200 h-10 w-10 flex items-center justify-center rounded-full"><i
                    className="fa-solid fa-location-dot"></i></h2>
                <h4 className="text-lg font-medium">24B, Dhaka, Gulshan 1</h4>
            </div>
        </div>
    );
};

export default LocationSearchPanel;