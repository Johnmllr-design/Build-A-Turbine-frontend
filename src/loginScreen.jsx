import {useState} from 'react'
import TurbineCard from './turbineCard'
import TurbineSidebar from './turbineSidebar'
import React from 'react'
import Fullscreen from './fullscreen'
import './App.css'
import TurbineSpinner from './turbineSpinner'

function LoginScreen() {
    const [loggedIn, setLogin] = useState(false);

    /* when the login is successful, provide the main functionality */
    /* make a new user account on login */
    async function login(username, password){
            console.log("logging in ", username);
            try{
                const response = await fetch("https://determined-luck-production-4525.up.railway.app/loginuser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                console.log(response);
                const result = await response.text();
                console.log("does " + username + " exist? " + ", " + result);

                /* log in if it's a new profile */
                if (result === 'true'){
                    setLogin(true)
                }else{
                    console.log("the following user doesn't exist: ", username);
                }
            }catch(error){
                console.log(error);
        }
    }


    async function makeNew(username, password, p2){
        if (username.length > 3 && password.length > 4 && password === p2){
            try{
                const response = await fetch("https://determined-luck-production-4525.up.railway.app/makenewuser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username, password }),
                });
                const result = await response.text();

                /* log in if it's a new profile */
                if (result === 'true'){
                    setLogin(true);
                }else{
                    console.log("User exists");
                }
            }catch(error){
                console.log(error);
            }
        }else{

            return false;
        }
    }




    if (!loggedIn){
        return (
        <div className='regular-card'>
            <TurbineSpinner size={140} speed={0.7}/>
            <TurbineSpinner size={140} speed={0.3}/>
            <TurbineSpinner size={140} speed={0.5}/>
            <TurbineSpinner size={140} speed={40}/>
            <div className='app-headline'>Build-A-Turbine</div>
            <div className='div4'>
                <div className='div2'>
                    <input className='div' id="uname" placeholder='username'/>
                    <input className='div' id="pw" placeholder='password'/>
                    <button className='btn' onClick={() => {login(document.getElementById("uname").value, document.getElementById("pw").value)}}>Log in</button>
                </div>
                <div className='div2'>
                    <input className='div' id="uname2" placeholder='username (3+ chars)'/>
                    <input className='div' id="pw2" placeholder='password (4+ chars)'/>
                    <input className='div' id="rpw2" placeholder='retype password (4+ chars)'/><br/>
                    <button className='btn' onClick={() => {makeNew(document.getElementById("uname2").value, document.getElementById("pw2").value, document.getElementById("rpw2").value)}}>Make a New Account</button>
                </div>
            </div>
        </div>
        )
    } else {
        return (
            <Fullscreen username={document.getElementById('uname').value}/>
        )
    }
}
export default LoginScreen