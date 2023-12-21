import { useState } from "react";
import {NavLink} from "react-router-dom"
import { useNavigate } from "react-router-dom";

function NavBar({currentUser, pinger, setPinger}) {

    const navigate = useNavigate()

    function handleDropdown(e) {
        if (e.target.value === 'newchat') {
            setPinger(pinger + 1)
            navigate('/create')
        }
        if (e.target.value === 'chatlist') {
            setPinger(pinger + 1)
            navigate('/listOfChats')
        }
    }

    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>

            {currentUser? null : <NavLink to="/login">Login</NavLink>}
            
            {currentUser? null: <NavLink to='/signup'>Sign Up</NavLink>}

            {currentUser? <select onChange={handleDropdown}>
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
