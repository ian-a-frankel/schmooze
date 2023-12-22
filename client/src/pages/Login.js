import NavBar from "../components/NavBar";
import { useState } from 'react'

import { useNavigate, NavLink } from "react-router-dom";

import './Login.css';



function Login({attemptLogin, currentUser}) {
    const [pressed, setPressed]=useState(false)
    const [userInfo, setUserInfo]=useState({
        full_name:'',
        password: ''
    })

    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(userInfo)
        attemptLogin(userInfo)
        setPressed(true)
    }

    function handleclick(){
        navigate('/listOfChats')
    }


    const navigate = useNavigate()
    return(
        <>
        <NavBar currentUser={currentUser} />
        <div className="login-form">
        {pressed && currentUser ? (
                <>
                <h1>Are you sure you want to Log in</h1>
                <button id='yesbtn' onClick={handleclick}>YES</button>
                </>
            ) : (
                <>
                    <h2>🌺 Log In 🌺</h2>
                    <h1>Enter the Realm of Connectivity

                    <br /> Schmooze
                    <br />Where Every Login Unleashes Opportunities!</h1>
                    <p>Enter your username and password to log in.</p>
                    <form onSubmit={(e)=>{
                        handleSubmit(e)
                        setPressed(true)
                    }}>

                        <label className="UsernameLabel">Username</label>
                        <input className="UsernameSignUp" onChange={handleChange} type="text" name="full_name" placeholder="username goes here" /><br/>
                        <label className="UsernameLabel">Password</label>
                        <input className="UsernameSignUp" onChange={handleChange} type="text" name="password" placeholder="password goes here" /><br/>

                        <button className="login-button" type="submit">Log in</button>
                    </form>
                    <div className="signup-link">
                    <NavLink  to="/signup">Sign up here if you do not have an account</NavLink>
                    </div>
                </>
            )}

        </div>
        </>
    )
}

export default Login;