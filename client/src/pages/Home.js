import Login from "./Login";
import Logout from "./Logout";
import Signup from "./Signup";
import Create from "./Create";
import Message from "./Conversation";
import {NavLink} from "react-router-dom"
import NavBar from "../components/NavBar";

function Home() {
    return(<>
    <NavBar />
        <div id="Schmooze" className="home">
            <p>Elevate Your Communication Game with Ease . 
            <br/> 🌍︎🌐︎ Click to Sign Up with Schmooze 🌐︎🌍︎
            </p>
            
            <img  src="/home.png" alt="Home"/>
            <p>Make Every Message Count,  Start Schmoozing, Sign Up Now</p>
                <p><NavLink to="/signup">Sign up</NavLink> 
                <br/><NavLink to="/login">Log in</NavLink></p>
                
            <img  src="/Stay.png" alt="Home"/>
            
            <img  src="/3.png" alt="Home"/>
            <img  src="/4.png" alt="Home"/>
            <img  src="/5.png" alt="Home"/>

        </div>

                    <div class="signup-buttons">
                        <p>Make Every Message Count  </p>
                        <p>Start Schmoozing, Sign Up Now!</p>
                        <NavLink to ="/signup">
                        <button onclick="/signup'">Click Here</button>
                        </NavLink>
                        </div>

                        <div className="signup-now">
                    <p>Already have an account?</p>
                    <NavLink to ="/login">
                    <button onClick={() => window.location.href = "/login"}>Log In</button>
                    </NavLink>
    
        </div>
    
        </>
    )
}

export default Home;
