
function Login() {
    return(
        <div className="login-form">
        <h2>⁜ Log In ⁜</h2>
            <form>
            <label>Username</label>
            <input  type="text" name="Username" placeholder="Username" /><br/>
            <label>Password</label>
            <input  type="text" name="Password" placeholder="Password" /><br/>
            <button type="submit">Log in</button>
            </form>
        
        </div>
    )
}

export default Login;