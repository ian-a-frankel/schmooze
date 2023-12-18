import {NavLink} from "react-router-dom"

function NavBar() {
    return (
        <nav className="navbar">
            <NavLink to="/">Home</NavLink>

            <NavLink to="/messages">Message</NavLink>

            <NavLink to="/create">New Chat</NavLink>

            <NavLink to="/login">Login</NavLink>

        </nav>
    )
}

export default NavBar;

