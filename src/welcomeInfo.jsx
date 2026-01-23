import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TurbineSidebar from './turbineSidebar.jsx'
import Fullscreen from './fullscreen.jsx'
import App from './welcomescreen.jsx'


function WelcomeInfo(){
    var String = "";
    const [value, setVal] = useState(1023);

    for(let i = 0; i < 54000; i++){
        setTimeout(() => {setVal(value + 1)}, 50);
    }

    return(
        <div className='welc'>Providing data-driven location inferences based on the historical performance of {value} turbines and counting...</div>
    )
}
export default WelcomeInfo