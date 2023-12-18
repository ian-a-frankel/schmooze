import NavBar from "../components/NavBar";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login({attemptLogin}) {
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
        <NavBar />
        <div className="login-form">
        <h2>⁜ Log In ⁜</h2>
            <form onSubmit={(e)=>{
                handleSubmit(e)
                // navigate('/messages')
            }}>
            <label>Username</label>
            <input onChange={handleChange} type="text" name="full_name" placeholder="Username" /><br/>
            <label>Password</label>
            <input onChange={handleChange} type="text" name="password" placeholder="password" /><br/>
            <button type="submit">Log in</button>
            </form>
            <a href="./Signup">Sign up here if you do not have an account</a>
        
        </div>
        </>
    )
}

export default Login;