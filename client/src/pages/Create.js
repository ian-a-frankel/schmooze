import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUser from "../components/AddUser";
import RemoveUser from "../components/RemoveUser";

function Create({currentUser}) {
    
    const [allUsers, setAllUsers] = useState([])
    const [deleteableMembers, setDeleteableMembers] = useState([])
    
    const [nameSearchText, setNameSearchText] = useState('')
    const [targetUser, setTargetUser] = useState('')

    const [chatName, setChatName] = useState('')
    

    const addableMembers = allUsers.filter(user => {
        return user.full_name.toUpperCase().includes(nameSearchText.toUpperCase())}).filter(user => {
            return !deleteableMembers.includes(user)
        
    })
    

    
    useEffect(() => {
        fetch('/api/users')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setAllUsers(data.filter(d => { 
                console.log(d.id)
                return d !== currentUser
            }))
        })
    }, [currentUser])
    // console.log(currentUser)


    
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
                <button type="submit" onSubmit={handleSubmit}>Create Chat With Selected Users</button>
                {displayAddUsers}
                <label>Name: </label>
                <input onChange={(e)=>{
                    setChatName(e.target.value) 
                    console.log(chatName)}}  type="text" name="create" placeholder="Optional" />
            </form>

        </div>
        </>
    )
}

export default Create;
