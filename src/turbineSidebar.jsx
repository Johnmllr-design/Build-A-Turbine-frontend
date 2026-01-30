import {useState} from 'react'
import TurbineCard from './turbineCard'
import React from 'react'
import { Input } from 'react-select/animated';


function TurbineSidebar(props) {

    const current_turbines = props.turbines;
    const setTurbines = props.setTurbines;
    const username = props.username;


    return (
        <div className='scrolldiv-2'>
            {current_turbines.map((turbine, i) => {
                console.log(turbine);
                if (turbine.valid == true){
                return(
                        <TurbineCard key={i} turb={turbine} username={username} allturbs={current_turbines} setTurbines={setTurbines}/> 
                )}
            }
            )}
        </div>
    )
}
export default TurbineSidebar