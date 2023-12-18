import NavBar from "../components/NavBar";

function Login() {
    return(
        <>
        <NavBar />
        <div className="login-form">
        <h2>⁜ Log In ⁜</h2>
            <form>
            <label>Username</label>
            <input  type="text" name="Username" placeholder="Username" /><br/>
            <label>Password</label>
            <input  type="text" name="Password" placeholder="Password" /><br/>
            <button type="submit">Log in</button>
            </form>
            <a href="./Signup">Sign up here if you do not have an account</a>
        
        </div>
        </>
    )
}

export default Login;