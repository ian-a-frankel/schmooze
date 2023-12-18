import NavBar from "../components/NavBar"

function Logout() {
    return(<>
        <NavBar />
        <div className="logout">
            <h2>⁜ Log Out ⁜</h2>
            <form>
            <button type="submit">Log Out</button>
            </form>
        </div>
        </>
    )
}

export default Logout