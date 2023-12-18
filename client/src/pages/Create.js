import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUser from "../components/AddUser";

function Create() {

    const [currentUser, setCurrentUser] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [deleteableMember, setDeleteableMember] = useState([])
    const [nameSearchText, setNameSearchText] = useState('')
    const addableMembers = allUsers.filter(user => {
        return user.full_name.toUpperCase().includes(nameSearchText.toUpperCase())
    })

    useEffect(() => {
        fetch('/users')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setAllUsers(data)
        })
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

    console.log(nameSearchText)

    const displayAddUsers = addableMembers.map(user => {
        return <AddUser key={user.id} user={user} />
    })

    return(<>
    <NavBar />
        <div className="create" >

            <form className="create">
                <Search setNameSearchText={setNameSearchText} />
                {displayAddUsers}
                <label>Name: </label>
                <input  type="text" name="create" placeholder="Optional" />
                <button type="submit" onSubmit={handleSubmit}>Create</button>
            </form>

        </div>
        </>
    )
}

export default Create;
