import {useState} from 'react'
import TurbineCard from './turbineCard'
import TurbineSidebar from './turbineSidebar'
import React from 'react'
import Fullscreen from './fullscreen'
import './App.css'
import TurbineSpinner from './turbineSpinner'
import WelcomeInfo from './welcomeInfo'
import Explanation from './explanation'

function LoginScreen() {
    const [loggedIn, setLogin] = useState(false);
    const [info, setInfo] = useState(false);
    const [incorrectLogin, setIncorrect] = useState(false);  
    const [doesntEsixt, setNotExist] = useState(false);  



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
                    setNotExist(true)
                }
            }catch(error){
                console.log(error);
        }
    }


    async function makeNew(username, password, p2){
        if (username.length >= 3 && password.length >= 4 && password === p2){
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
                    setIncorrect(true);
                }
            }catch(error){
                console.log(error);
            }
        }else{

            return false;
        }
    }

    if (info){
        return (<Explanation/>)
    }

    if (!loggedIn){
        return (
        <div className="login-screen">
            <div className="login-card">
                <h1 className="app-headline">Build-A-Turbine</h1>
                <div className="login-panels">
                    <div className="login-panel">
                        <h3 className="login-panel__title">Log in</h3>
                        <input className="login-input" id="uname" placeholder="Username" />
                        <input className="login-input" id="pw" type="password" placeholder="Password" />
                        <button className="btn" onClick={() => login(document.getElementById("uname").value, document.getElementById("pw").value)}>Log in</button>
                    </div>
                    <div className="login-panel">
                        <h3 className="login-panel__title">Create Account</h3>
                        <input className="login-input" id="uname2" placeholder="Username (3+ chars)" />
                        <input className="login-input" id="pw2" type="password" placeholder="Password (4+ chars)" />
                        <input className="login-input" id="rpw2" type="password" placeholder="Retype password" />
                        <button className="btn" onClick={() => makeNew(document.getElementById("uname2").value, document.getElementById("pw2").value, document.getElementById("rpw2").value)}>Create Account</button>
                    </div>
                </div>
            </div>
            <button className="welc welc--clickable" onClick={() => setInfo(true)}>
                How does Build-A-Turbine work?
            </button>
            {incorrectLogin && <div className="welc welc--error">Username already taken</div>}
            {doesntEsixt && <div className="welc welc--error">User doesn&apos;t exist</div>}
        </div>
        )
    } 
    
    else {
        return (
            <Fullscreen username={document.getElementById('uname')?.value || document.getElementById('uname2')?.value || ''} />
        )
    }
}
export default LoginScreen