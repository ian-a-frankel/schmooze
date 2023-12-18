import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import React, {useState} from 'react';

function Signup({attemptSignup}) {
    const [userInfo, setUserInfo]=useState({
        full_name:'',
        password: '',
        image:''
    })

    function handleChange(event) {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault()
        attemptSignup(userInfo)
      }

    const navigate = useNavigate()
    return(
        <>
        <NavBar />
        <div className="signup-form">
        <h2>⁜ Sign Up ⁜</h2>
            <form onSubmit={(e)=>{
                handleSubmit(e)
                navigate('/messages')
            }}>
                <label>Enter your Username</label>
                <input  onChange={handleChange} type="text" name="full_name" placeholder="Username" /><br/>
                <label>Create Password</label>
                <input onChange={handleChange} type="text" name="password" placeholder="Password" /><br/>
                <label>Upload Avatar</label>
                <input onChange={handleChange} type="text" name="image" placeholder="Image URL" /><br/>
                <button type="submit">Sign Up</button>
            </form>
        
        </div>
        </>
    )
}

export default Signup;