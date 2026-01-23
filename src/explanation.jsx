import {useEffect, useState} from 'react'
import TurbineCard from './turbineCard'
import TurbineSidebar from './turbineSidebar'
import React from 'react'
import Select from 'react-select/base'
import './App.css'
import ScrollBar from './scrollBar'
import LoginScreen from './loginScreen'



function Explanation(){

    const [ret, setRet] = useState(false);

    if(ret){
        return (<LoginScreen/>)
    } else{
        return (
            <div>
                <div className='welc'> 
                    Build-A-Turbine is a lightweight frontend wrapper around an instance of the
                    Google Maps API. This works in harmony with a pytorch model trained on 
                    historical information from the electricity generation of 60,000 publically 
                    available turbine locations's electricity output. Using the promise of data science,
                    which tells us that we can reason about patterns given a large enough dataset,
                    build-a-turbine lets corporations and regular people alike leverage AI and deep learning to
                    predict turbine performance before breaking ground.
                </div>
                <button className='btn' onClick={() => {setRet(true)}}>
                    back to login
                </button>
            </div>
        )
    }
}

export default Explanation