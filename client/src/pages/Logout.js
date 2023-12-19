
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";


function Logout({logout, currentUser}) {
    const navigate = useNavigate()
    

    return (
        <>
        <NavBar currentUser={currentUser} />
        <div className="logout-container">
            <h2>Are you sure you want to log out?</h2>
            <p>You will not be able to leave comments and like your favorite movies.</p>
            <button onClick={()=>{
                logout()
                navigate('/')
            }}>Log Out</button>
        </div>
        </>
    );
}

export default Logout