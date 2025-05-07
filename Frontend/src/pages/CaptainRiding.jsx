import React, {useRef, useState} from 'react';
import mapIcon from "../images/map_images.png";
import CaptainDetails from "../components/CaptainDetails.jsx";
import RidePopUp from "../components/RidePopUp.jsx";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp.jsx";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import FinishRide from "../components/FinishRide.jsx";

const CaptainRiding = () => {
    const [finishRidePanel, setFinishRidePanel] = useState(false);
    const finishRidePanelRef = useRef(null);
    useGSAP(() => {
        if(finishRidePanel){

            gsap.to(finishRidePanelRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(finishRidePanelRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[finishRidePanel])
    return (
        <div className='h-screen'>
            <div className="h-4/5">
                <img className="h-full w-full object-cover" src={mapIcon} alt=""/>
            </div>
            <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10'
                 onClick={() => {
                     setFinishRidePanel(true);
                 }
                 }
            >

                <h5 className='p-1 text-center w-[90%] absolute top-0' ></h5>
                <h4 className='text-xl font-semibold'>4 KM away</h4>
                <button className=' bg-green-600 text-white font-semibold p-3 px-10 rounded-lg'>Complete Ride</button>
            </div>
            <div>
                <div ref={finishRidePanelRef}
                     className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                    <FinishRide setFinishRidePanel={setFinishRidePanel}/>
                </div>
            </div>
        </div>

    );
};

export default CaptainRiding;