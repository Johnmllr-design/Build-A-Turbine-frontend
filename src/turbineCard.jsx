import { lazy, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Select from "react-select"
import './App.css'
import select from 'select'
import input from 'react'
import { Input } from 'react-select/animated'
import './App.css'


function TurbineCard(props) {
  const username = props.username;
  const turbine = props.turb;
  const [pred, setPred] = useState('?')
  const current_turbines = props.allturbs;
  const setTurbines = props.setTurbines;

  async function removeTurbine(type, date){
    let arr = []
    for (const turbine of current_turbines){
      if (turbine.valid){
        arr.push(turbine);
      } 
    }
    setTurbines(arr);

    // string to query the removing turbine API endpoint
    const apiString = "https://determined-luck-production-4525.up.railway.app/removeturbine";

    // make a post request to remove the value
    const result = await fetch(apiString, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({username, type, date})
    });

    const resultText = await result.text();
    console.log(resultText);
    return resultText;
}
  
  async function getModelPrediction(){

    // string to query the pytorch model
    const apiString = "https://buildaturbine-deep-learning-production.up.railway.app/prediction";

    const payload = {type: turbine.type, longitude : turbine.long, latitude : turbine.lat};

    // make a get request
    const result = await fetch(apiString, { 
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)});

    const json = await result.json();

    // get the results as a string
    const textResults = (await json.returnedVal);
    return textResults;
  }

  return (
    <div className='div2'>
      {turbine.type} at {Math.floor(turbine.lat)}, {Math.floor(turbine.long)}
      <button className='btn' onClick={() => {setPred(getModelPrediction())}}>Get an AI value estimate!</button>
      <div className='div3' > {pred} </div>
      <button className='btn' onClick={() => {turbine.valid = false; removeTurbine(turbine.type, turbine.date);}}> Remove this turbine</button>
    </div>
  )
}
export default TurbineCard

