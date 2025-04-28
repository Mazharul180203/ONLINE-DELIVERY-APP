import React, {useRef, useState, useEffect} from 'react';
import deliveryIcon from "../images/deliveryIcon.png";
import mapIcon from "../images/map_images.png";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LocationSearchPanel from "./locationSearchPanel.jsx";

const Home = () => {
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseref = useRef(null);
    const [info, setInfo] = useState({
        pickup: "",
        destination: ""
    });
    const submitHandler = (e) => {
        e.preventDefault();
    };

useGSAP(() => {
    gsap.to(panelRef.current, {
        height: panelOpen ? '70%' : '0%',
    });
    gsap.to(panelCloseref.current, {
        opacity: panelOpen ? 1 : 0,
    });
}, [panelOpen]);

    return (
        <div className="h-screen relative">
            <img className="w-16 absolute left-5 top-5" src={deliveryIcon} alt="delivery icon"/>
            <div className="h-screen w-screen">
                <img className="w-full h-full object-cover" src={mapIcon} alt="map Icon"/>
            </div>
            <div className="bg-white h-screen flex flex-col justify-end absolute top-0 w-full">
                <div className="h-[30%] p-5 bg-white">
                    <h5 ref={panelCloseref} onClick={()=>
                        setPanelOpen(false)} className="absolute opacity-0 right-2 top -2 text-2xl">
                        <i className="fa-solid fa-angle-down"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a Trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>

                        <input
                            onClick={() => setPanelOpen(true)}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5" type="text"
                            placeholder="Add a pick-up location"
                            value={info.pickup}
                            onChange={(e => setInfo(
                                {...info, pickup: e.target.value}))}
                        />
                        <input
                            onClick={() => setPanelOpen(true)}
                            className="bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3"
                            type="text"
                            value={info.destination}
                            onChange={(e) => setInfo({...info, destination: e.target.value})}
                            placeholder="Enter your Destination"
                        />
                    </form>
                </div>
                <div ref={panelRef} className="h-0 bg-white ">
                    <LocationSearchPanel/>
                </div>
            </div>
        </div>
    );
};

export default Home;
