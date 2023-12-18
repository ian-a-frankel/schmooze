import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUsersButton from "../components/AddUsersButton";

function Create() {

    const [currentUser, setCurrentUser] = useState('')
    const [deleteableMember, setDeleteableMember] = useState('')
    const [addableMember, setAddableMember] = useState('')
    const [nameSearchText, setNameSearchText] = useState('')

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(data => console.log(data))
    }, [])

    return(<>
    <NavBar />
        <div className="create" >

            <form className="create">
                <Search />
                <AddUsersButton/>
                <label>Name: </label>
                <input  type="text" name="create" placeholder="Optional" />
                <button type="submit">Create</button>
            </form>

        </div>
        </>
    )
}

export default Create;
