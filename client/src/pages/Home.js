import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Create from "./Create";
import Message from "./Conversation";
import {NavLink} from "react-router-dom"
import NavBar from "../components/NavBar";

function Home({currentUser, pinger, setPinger}) {
    return(<>

    <NavBar currentUser={currentUser} pinger={pinger} setPinger={setPinger}/>
            
            
            <div class="image-container">
            <img  src="/home.svg" alt="Home"/>  
            </div>

        <div>
            <img  src="/2.svg" alt="Home"/>
            <img  src="/3.svg" alt="Home"/>
            <img  src="/4.svg" alt="Home"/>
            <img  src="/5.svg" alt="Home"/>

        </div>

                    <div class="signup-buttons">
                        <NavLink to ="/signup">
                        <button onClick="/signup'">Click Here</button>
                        </NavLink>
                        </div>

    
        </>
    )
}

export default Home;
