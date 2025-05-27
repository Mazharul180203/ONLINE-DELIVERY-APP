import React, {useContext, useEffect, useRef, useState} from 'react';
import mapIcon from "../images/map_images.png";
import CaptainDetails from "../components/CaptainDetails.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import RidePopUp from "../components/RidePopUp.jsx";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp.jsx";
import useLoadingStore from "../store/loadingStore.js";
import {SocketContext} from "../Socket/SocketProvider.jsx";
import axaios from "axios";

const CaptainHome = () => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false);
    const [ride, setRide] = useState(null);
    const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const ridePopUpPanelRef = useRef(null);
    const confirmRidePopUpPanelRef = useRef(null);
    const setLoading = useLoadingStore((state) => state.setLoading);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        const captainDetails = JSON.parse(localStorage.getItem('captainDetails'));
        const captainId = captainDetails?.id;
        if (!captainId) {
            console.error('No userId found in localStorage.userDetails');
            return;
        }
        socket.emit("join", { userType: "captain", userId: captainId})

        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {

                    console.log("captaindetails :",{
                        userId: captainId,
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    });
                    
                    socket.emit('update-location-captain', {
                        userId: captainId,
                        latitude:position.coords.latitude,
                        longitude:position.coords.longitude
                    })
                })
            }
        }
        const locationInterval = setInterval(updateLocation, 10000)
       updateLocation();
    }, [])

    
    socket.on('new-ride', (data) => {
        console.log("New ride request received:", data);
        setRide(data);
        setRidePopUpPanel(true);

    });

    const confirmRide = async() => {
        const response = await axaios.post(
            `${import.meta.env.VITE_BASE_URL}/rides/confirm`,{
                rideId: ride.id,
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            }
        );
        setRidePopUpPanel(false);
        setConfirmRidePopUpPanel(true);
    }


    useGSAP(() => {
        if(ridePopUpPanel){

            gsap.to(ridePopUpPanelRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(ridePopUpPanelRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[ridePopUpPanel])
    useGSAP(() => {
        if(confirmRidePopUpPanel){

            gsap.to(confirmRidePopUpPanelRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(confirmRidePopUpPanelRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[confirmRidePopUpPanel])
    return (
        <div className='h-screen'>
            <div className="h-3/5">
                <img className="h-full w-full object-cover" src={mapIcon} alt=""/>
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails/>
            </div>
            <div ref={ridePopUpPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                <RidePopUp 
                    ride={ride}
                    setRidePopUpPanel={setRidePopUpPanel}
                    setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
                    confirmRide={confirmRide}
                    />
            </div>
            <div ref={confirmRidePopUpPanelRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                <ConfirmRidePopUp setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setRidePopUpPanel={setRidePopUpPanel}/>
            </div>
        </div>
    );
};

export default CaptainHome;