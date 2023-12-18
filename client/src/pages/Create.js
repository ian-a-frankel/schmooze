import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUser from "../components/AddUser";
import RemoveUser from "../components/RemoveUser";

function Create({URL}) {
    // const [currentUser, setCurrentUser] = useState('')
    const [allUsers, setAllUsers] = useState([])
    const [deleteableMembers, setDeleteableMembers] = useState([])
    
    const [nameSearchText, setNameSearchText] = useState('')
    const [targetUser, setTargetUser] = useState('')
    

    const addableMembers = allUsers.filter(user => {
        return user.full_name.toUpperCase().includes(nameSearchText.toUpperCase())}).filter(user => {
            return !deleteableMembers.includes(user)
        
    })
    


    useEffect(() => {
        fetch(URL+'/users')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setAllUsers(data)
        })
    }, [])


    
    function handleAdd(e) {
        e.preventDefault()
        const newDeleteable = [...deleteableMembers, targetUser]
        setDeleteableMembers(newDeleteable)
        console.log(newDeleteable)
        
    }
    
    
    function handleRemove(e) {
        e.preventDefault()
        const newDeleteable = deleteableMembers.filter(user => {
            return user !== targetUser
        })
        setDeleteableMembers(newDeleteable)
    }
    
    function handleSubmit(e) {
        e.preventDefault()
        
    }
    

    const displayAddUsers = addableMembers.map(user => {
        return <AddUser key={user.id} user={user} handleAdd={handleAdd}  setTargetUser={setTargetUser}/>
    })
    const displayRemove = deleteableMembers.map(user => {
        return <RemoveUser key={user.id} user={user} handleRemove={handleRemove} setTargetUser={setTargetUser} />
    })



    return(<>
    <NavBar />
        <div className="create" >

            <form className="create">
                <Search setNameSearchText={setNameSearchText} />
                {displayRemove}
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
