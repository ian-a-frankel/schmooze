function NavBar() {
    return (
        <nav className="navbar">
            <a href="#Home">Home</a>
            <a href="#Message">Message</a>
            <a href="#Create">Create</a>
            {/* <a href="#LoginSignup">{isLogin? "Log Out": "Log In or Sign Up" }</a> */}
        </nav>
    )
}

export default NavBar;