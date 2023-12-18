import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUsersButton from "../components/AddUsersButton";

function Create() {
    // const [currentUser, setCurrentUser] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [deleteableMember, setDeleteableMember] = useState('')
    const [addableMember, setAddableMember] = useState('')
    const [nameSearchText, setNameSearchText] = useState('')

    useEffect(() => {
        fetch('127.0.0.1/5555/users')
        .then(resp => resp.json())
        .then(data => setAllUsers(data))
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
    }

    function handleAdd(e) {
        e.preventDefault()

    }

    function handleRemove(e) {
        e.preventDefault()
    }



    return(<>
    <NavBar />
        <div className="create" >

            <form className="create">
                <Search />
                <AddUsersButton/>
                <label>Name: </label>
                <input  type="text" name="create" placeholder="Optional" />
                <button type="submit" onSubmit={handleSubmit}>Create</button>
            </form>

        </div>
        </>
    )
}

export default Create;
