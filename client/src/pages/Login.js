import NavBar from "../components/NavBar";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './Login.css';



function Login({attemptLogin, currentUser}) {
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
    }

    const navigate = useNavigate()
    return(
        <>
        <NavBar currentUser={currentUser} />
        <div className="login-form">
            
        <h2>🌺 Log In 🌺</h2>
        <h1>Enter the Realm of Connectivity
            <br /> Schmooze
            <br />Where Every Login Unleashes Opportunities!</h1>
            <p>Enter your username and password to log in.</p>
            <form onSubmit={(e)=>{
                handleSubmit(e)
                if (currentUser) {
                    navigate('/listOfChats')
                }
                
            }}>
            <label className="UsernameLabel">Username</label>
            <input className="UsernameSignUp" onChange={handleChange} type="text" name="full_name" placeholder="username goes here" /><br/>
            <label className="UsernameLabel">Password</label>
            <input className="PasswordSignUp" onChange={handleChange} type="text" name="password" placeholder="password goes here" /><br/>
            </form>
            <button className="login-button" onClick={handleSubmit}>Log In</button>
            <a className="signup-link" href="./Signup">Sign up here if you do not have an account</a>
        
        </div>
        </>
    )
}

export default Login;