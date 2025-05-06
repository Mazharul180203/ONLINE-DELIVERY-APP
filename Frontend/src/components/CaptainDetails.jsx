import React from 'react';

const CaptainDetails = () => {
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img className="h-10 w-10 rounded-full object-cover"
                         src="https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
                         alt=""/>
                    <h4 className="text-lg font-medium">Mazharul Islam</h4>
                </div>
                <div>
                    <h4 className="text-xl font-semibold">$234.55</h4>
                    <p className="text-sm  text-gray-600">Earned</p>
                </div>
            </div>
            <div className="flex p-3 mt-6 justify-center bg-gray-100 gap-5 itms-center mt-5">
                <div className="text-center">
                    <i className="text-3xl font-thin fa-solid fa-clock"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gra-600">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl font-thin fa-solid fa-gauge-simple-high"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gra-600">Hours Online</p>
                </div>
                <div className="text-center">
                    <i className="text-3xl font-thin fa-solid fa-note-sticky"></i>
                    <h5 className="text-lg font-medium">10.2</h5>
                    <p className="text-sm text-gra-600">Hours Online</p>
                </div>
            </div>
        </div>
    );
};

export default CaptainDetails;