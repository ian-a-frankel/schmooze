function Signup() {
    return(
        <div className="signup-form">
        <h2>⁜ Sign Up ⁜</h2>
            <form>
                <label>Create Username</label>
                <input  type="text" name="Username" placeholder="Username" /><br/>
                <label>Create Password</label>
                <input  type="text" name="Password" placeholder="Password" /><br/>
                <label>Upload Avatar</label>
                <input  type="text" name="Avatar" placeholder="Image URL" /><br/>
                <button type="submit">Sign Up</button>
            </form>
        
        </div>
    )
}

export default Signup;