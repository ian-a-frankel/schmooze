import Login from "../components/Login";
import Logout from "../components/Logout";
import Signup from "../components/Signup/Signup";
import Create from "./Create";
import LoginSignup from "./LoginSignUp";
import Message from "./Message";


function Home() {
    return(
        <div id="welcome">
            <h1>Welcome to Schmooze</h1>
            <p>Schmooze is an interactive online platform designed to connect individuals from various professional backgrounds, fostering friendly and respectful conversations. Whether you're seeking answers to your questions, looking for knowledge-sharing opportunities, or needing assistance, Schmooze provides a vibrant space for engaging discussions</p>
            <div className="sign-in">
                <p><a href="#LoginSignup">Sign up</a> or <a href="#LoginSignup">Log in</a></p>
            </div>
            {/* <Login />
            <Logout/>
            <Signup /> */}
            {/* <Message /> */}
            <Create />
        </div>

    )
}

export default Home;