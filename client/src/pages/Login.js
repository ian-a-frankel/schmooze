import NavBar from "../components/NavBar";
import { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";

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
                <button id='createchat' onClick={handleclick}>YES</button>
                </>
            ) : (
                <>
                    <h2>⁜ Log In ⁜</h2>
                    <form onSubmit={(e)=>{
                        handleSubmit(e)
                        setPressed(true)
                    }}>
                        <label>Username</label>
                        <input onChange={handleChange} type="text" name="full_name" placeholder="Username" /><br/>
                        <label>Password</label>
                        <input onChange={handleChange} type="text" name="password" placeholder="password" /><br/>
                        <button id='createchat' type="submit">Log in</button>
                    </form>
                    <Link to="/signup">Sign up here if you do not have an account</Link>
                </>
            )}
        </div>
        </>
    )
}

export default Login;