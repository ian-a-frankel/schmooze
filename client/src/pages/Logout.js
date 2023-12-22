
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import './Logout.css'

function Logout({logout, currentUser, pinger, setPinger}) {
    const navigate = useNavigate()
    

    return (
        <>
        <NavBar currentUser={currentUser} pinger={pinger} setPinger={setPinger}/>
        <div className="logout-container">
            <div id='logouttext' >
            <h2>Are you sure you want to log out?</h2>
            <p>You will not be able to leave comments and like your favorite movies.</p>
            </div>
        </div>

            <button id='logoutbtn' onClick={()=>{
                logout()
                navigate('/')
            }}>Log Out</button>
        <div className="logoutimg">
            <img src="https://i.imgur.com/50AOqXz.png" alt="logout" />
        </div>
        </>
    );
}

export default Logout