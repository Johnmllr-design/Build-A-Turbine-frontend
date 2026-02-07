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
            <div className="explanation-screen">
                <div className="explanation-content">
                    <h2 className="explanation-title">How Build-A-Turbine Works</h2>
                    <div className="welc explanation-text">
                        Build-A-Turbine is a lightweight frontend wrapper around the Google Maps API,
                        working in harmony with a PyTorch model trained on historical electricity generation
                        from <strong>60,000+</strong> publicly available turbine locations. Using the promise of data science
                        — that we can reason about patterns given a large enough dataset — Build-A-Turbine lets
                        corporations and individuals alike leverage <strong>AI and deep learning</strong> to predict
                        turbine performance before breaking ground.
                    </div>
                    <button className="btn" onClick={() => setRet(true)}>
                        ← Back to login
                    </button>
                </div>
            </div>
        )
    }
}

export default Explanation