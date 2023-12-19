import React from 'react';
import "../index.css";
import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
                {/* Add other navigation links */}
            </ul>
        </nav>
    );
};

export default NavBar;