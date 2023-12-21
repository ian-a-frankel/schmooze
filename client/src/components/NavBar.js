import { useState } from "react";
import {NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function NavBar({currentUser}) {

    const navigate = useNavigate()

    function handleDropdown(e) {
        if (e.target.value === 'newchat') {
            navigate('/create')
        }
        if (e.target.value === 'chatlist') {
            navigate('/listOfChats')
        }
    }

    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>

            {currentUser? null : <NavLink to="/login">Login</NavLink>}
            
            {currentUser? null: <NavLink to='/signup'>Sign Up</NavLink>}

            {currentUser? <select style={{background: 'none', color: 'white', border: 'none', outline: 'none', fontSize: '120%', fontWeight: 'bold', transition: 'color 0.3s ease-in-out'}} onChange={handleDropdown}>
                <option>Chat Menu</option>
                <option value='chatlist' name='chatlist'>List Of Chats</option>
                <option value='newchat' name='newchat'>New Chat</option>
            </select> : null}

            {/* {currentUser?<NavLink to="/create">New Chat</NavLink>: null}

            {currentUser?<NavLink to="/listOfChats">List Of Chats</NavLink>: null} */}

            {currentUser?<NavLink to="/logout">LogOut</NavLink>:null}

        </nav>
    )
}

export default NavBar;
