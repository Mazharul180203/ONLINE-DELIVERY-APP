import React, {useRef, useState} from 'react';
import deliveryIcon from "../images/deliveryIcon.png";
import mapIcon from "../images/map_images.png";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import LocationSearchPanel from "../components/locationSearchPanel.jsx";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmRide from "../components/ConfirmRide.jsx";
import LookingForDriver from "../components/LookingForDriver.jsx";
import WaitingForDrivers from "../components/WaitingForDrivers.jsx";
import axios from "axios";
import useLoadingStore from "../store/loadingStore.js";

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const panelCloseref = useRef(null);
    const [ destination, setDestination ] = useState('');
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const vehiclePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const confirmRidePanelRef = useRef(null);
    const [ pickupSuggestions, setPickupSuggestions ] = useState([]);
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([]);
    const [ activeField, setActiveField ] = useState(null)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingforDriver, setWaitingforDriver] = useState(false);
    const [vehicleType, setVehicleType] = useState(null);
    const [fare, setFare] = useState(null)
    const setLoading = useLoadingStore((state) => state.setLoading);
    const submitHandler = (e) => {
        e.preventDefault();
    };
    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log("pickup suggestions", response.data)
            setPickupSuggestions(response.data)
        } catch {

        }
    }

    const handleDestinationChange = async (e) => {
        console.log("token", localStorage.getItem('token'))

        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {

        }
    }

    useGSAP(() => {
        gsap.to(panelRef.current, {
            height: panelOpen ? '70%' : '0%',
        });
        gsap.to(panelCloseref.current, {
            opacity: panelOpen ? 1 : 0,
        });
    }, [panelOpen]);
    useGSAP(() => {
        if(vehiclePanel){

            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(vehiclePanelRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[vehiclePanel])
    useGSAP(() => {
        if(vehicleFound){

            gsap.to(vehicleFoundRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(vehicleFoundRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[vehicleFound])
    useGSAP(() => {
        if(waitingforDriver){

            gsap.to(waitingForDriverRef.current, {
                transform:'translateY(0)',
            })
        }else{
            gsap.to(waitingForDriverRef.current, {
                transform:'translateY(100%)',
            })
        }
    },[waitingforDriver])
    useGSAP(() => {
    if(confirmRidePanel){

        gsap.to(confirmRidePanelRef.current, {
            transform:'translateY(0)',
        })
    }else{
        gsap.to(confirmRidePanelRef.current, {
            transform:'translateY(100%)',
        })
    }
},[confirmRidePanel])

    const findTrip = async () => {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
            params: { pickup, destination },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setLoading(false);
        setFare(response.data.fare)
        setVehiclePanel(true);
        setPanelOpen(false);
        console.log(response.data.fare)
    }

    const createRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        console.log(response.data)
    }
    return (
        <div className="h-screen relative overflow-hidden">
            <img className="w-16 absolute left-5 top-5" src={deliveryIcon} alt="delivery icon"/>
            <div className="h-screen w-screen">
                <img className="w-full h-full object-cover" src={mapIcon} alt="map Icon"/>
            </div>
            <div className="bg-white h-screen flex flex-col justify-end absolute top-0 w-full">
                <div className="h-[30%] p-5 bg-white">
                    <h5 ref={panelCloseref} onClick={() =>
                        setPanelOpen(false)} className="absolute opacity-0 right-2 top -2 text-2xl">
                        <i className="fa-solid fa-angle-down"></i>
                    </h5>
                    <h4 className="text-2xl font-semibold">Find a Trip</h4>
                    <form onSubmit={(e) => {
                        submitHandler(e);

                    }}>

                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')
                            }}
                            value={pickup}
                            onChange={handlePickupChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')
                            }}
                            value={destination}
                            onChange={handleDestinationChange}
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination'
                        />
                    </form>
                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>
                <div ref={panelRef} className="h-0 bg-white mt-4">
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>
                <div ref={vehiclePanelRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                    <VehiclePanel
                        selectVehicle={setVehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehiclePanel={setVehiclePanel}
                        fare={fare}
                    />
                </div>
                <div ref={confirmRidePanelRef}
                     className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                    <ConfirmRide
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        vehicleType={vehicleType}
                        setConfirmRidePanel={setConfirmRidePanel}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
                <div ref={vehicleFoundRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                    <LookingForDriver
                        createRide={createRide}
                        pickup={pickup}
                        destination={destination}
                        vehicleType={vehicleType}
                        setVehicleFound={setVehicleFound}
                    />
                </div>
                <div ref={waitingForDriverRef} className="fixed w-full z-10 translate-y-full bottom-0 bg-white px-3 py-10">
                    <WaitingForDrivers waitingforDriver={waitingforDriver}/>
                </div>
            </div>
        </div>
    );
};

export default Home;
