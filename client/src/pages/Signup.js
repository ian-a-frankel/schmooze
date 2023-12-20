import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import {NavLink} from "react-router-dom"
import './Signup.css';

function Signup({ attemptSignup, currentUser }) {
    const [userInfo, setUserInfo] = useState({
        full_name: '',
        password: '',
        image: ''
    });

    const handleChange = (event) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        attemptSignup(userInfo);
        navigate('/login');
    }

    const navigate = useNavigate();

    return (
        <>
            <NavBar currentUser={currentUser} />
            <div className="signupOuterContainer">  
                <div className="signupInnerContainer">
                    <h1 className="heading">💬 Sign Up</h1>

                    <h2 className="subHeading">Connect, Collaborate, Succeed 
                    <br />Join Schmooze 
                    <br />Where Opportunities Unfold!
                    </h2>
                    <form onSubmit={(e)=>{
                        handleSubmit(e)
                        navigate('/login')
                    }}>
                        <label className="label">Enter your Username</label>
                        <input  onChange={handleChange} className="joinInput" type="text" name="full_name" placeholder="Username" /><br/>
                        <label className="label1">Create Password</label>
                        <input onChange={handleChange} className="joinInput1" type="text" name="password" placeholder="Password" /><br/>
                        <label className="label2">Upload Avatar</label>
                        <input onChange={handleChange} className="joinInput2" type="text" name="image" placeholder="Image URL" /><br/>
                        <NavLink onClick={(e) => (!userInfo.full_name || !userInfo.password || !userInfo.image) ? e.preventDefault() : null} to={`/login`}>
                    </NavLink>
                    <button onclick="/login'">SUBMIT</button> 
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
