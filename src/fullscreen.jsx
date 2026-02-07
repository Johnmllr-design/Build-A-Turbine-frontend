import {useEffect, useState} from 'react'
import TurbineCard from './turbineCard'
import TurbineSidebar from './turbineSidebar'
import React from 'react'
import Select from 'react-select/base'
import './App.css'
import ScrollBar from './scrollBar'

import {
    APIProvider,
    Map,
    Pin,
    InfoWindow,
    AdvancedMarker
}from '@vis.gl/react-google-maps'


function Fullscreen(props) {

    const [centerPos, setPos] = useState({lat : 40, lng : 265})
    const [dz, setZoom] = useState(4.6)
    const [turbines, setTurbine] = useState([]);
    const [selectedTurbine, setSelected] = useState("select a type above");
    const [mapClicked, setClick] = useState(false);
    const [opened, setOpened] = useState(false);
    const [clickedLocation, setLoc] = useState({lat : 40, lng : 265});
    const [mapTurb, setMapTurb] = useState("");
    const date = new Date();
    const officialDate = "" + date.getMonth().toString() + "-" + date.getDate().toString() + "-" + date.getFullYear().toString();




    const username = props.username;
  

    /* add a turbine to the backend */
    async function addTurbine(username, type, date) {
        try {
        const backendApiString = "https://determined-luck-production-4525.up.railway.app/addturbine";
        const response = await fetch(backendApiString, {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({username, type, date})
        });
        } catch (error) {
            console.log(error);
        }
    }

    /* function to ensure a turbine has been properly selected before adding to user queue */
    function selected(){
        return (selectedTurbine !== "select a type above" && mapClicked);
    }



    return (
        <div className="container fullscreen-layout">
            <TurbineSidebar turbines={turbines} username={username} setTurbines={setTurbine} />
            <APIProvider apiKey="AIzaSyBTgKunKe6FIf4zdhWSjZh1oZZ76lhEG9I">
                <div className="map-container" style={{ touchAction: 'none' }}>
                    
                    {/*Map component*/}
                    <Map 
                    style={{ height: "100%", width: "100%" }}
                    id="map" 
                    mapId="8a273d3da3a319bb876b5293" 
                    defaultCenter={centerPos}
                    defaultZoom={dz}
                    gestureHandling={true}
                    colorScheme='DARK'
                    disableDefaultUI={true}
                    onClick={(e) => {
                    setClick(true);
                    document.getElementById("long").value = e.detail.latLng.lng 
                    document.getElementById("lat").value = e.detail.latLng.lat}}
                    >

                        {
                        turbines.map((turb, i) => 
                            {return(
                                <AdvancedMarker key={i} position={{lat : Number(turb.lat), lng :  Number(turb.long)}} onClick={() => {
                                    setMapTurb(turb.type); 
                                    setOpened(true);
                                    setLoc({lat : Number(turb.lat), lng :  Number(turb.long)})}}>
                                    <Pin background="#22d3ee" glyphColor="#05080d" borderColor="#14b8a6" scale={0.6} />
                                </AdvancedMarker>)
                            })
                        }
                        {opened && 
                        <InfoWindow position={clickedLocation} onCloseClick={() => {setOpened(false);}}>
                            <div className="map-infowindow">{mapTurb} — {Number(clickedLocation.lat).toFixed(2)}°, {Number(clickedLocation.lng).toFixed(2)}°</div>
                        </InfoWindow>
                        }
                    </Map>
                </div>
            </APIProvider>
            <div className="regular_card add-turbine-panel">
                <h3 className="panel-label">Select Turbine Type</h3>
                <ScrollBar selectedTurbine={selectedTurbine} setSelected={setSelected}/>
                <div className='div3' id="type">{selectedTurbine}</div>
                <input className="input" id="long" placeholder="Click map for longitude" />
                <input className="input" id="lat" placeholder="Click map for latitude" />
                <button className="btn" onClick={() => {
                            if(selected()){
                                /* set the new user's turbines for the sidebar */
                                setTurbine(turbines => [...turbines, {
                                type: selectedTurbine, 
                                long: document.getElementById("long").value, 
                                lat:document.getElementById("lat").value,
                                date: officialDate,
                                valid: true
                                }])  
                                
                                /* make a call to the backend to store this turbine in the database*/
                                console.log("making turbine:" + username + " " + selectedTurbine + " " + officialDate);
                                addTurbine(username, selectedTurbine, officialDate);
                        }
                    }}>Add Turbine Location</button>
            </div>
        </div>
    )
}

export default Fullscreen
