import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUser from "../components/AddUser";
import RemoveUser from "../components/RemoveUser";
import {useNavigate} from "react-router-dom"

function Create({currentUser}) {

    const [allUsers, setAllUsers] = useState([])
    const [deleteableMembers, setDeleteableMembers] = useState([])
    
    const [nameSearchText, setNameSearchText] = useState('')
    const [targetUser, setTargetUser] = useState('')

    const [chatName, setChatName] = useState('')
    const [allConversations, setAllConversations] = useState([])
    const [conversationID, setConversationID] = useState(0)
    const [submittedForm, setSubmittedForm] = useState(false)

    const navigate = useNavigate()

    if(submittedForm){
        navigate('/')
    }

    const addableMembers = allUsers.filter(user => {
        return user.full_name.toUpperCase().includes(nameSearchText.toUpperCase())}).filter(user => {
            return !deleteableMembers.includes(user)
        
    })

    useEffect(() => {
        if (currentUser) {
            fetch('/api/users')
            .then(resp => resp.json())
            .then(data => {
                setAllUsers(data.filter(d => { 
                    return d.id !== currentUser.id
                }))
            })
        }
    }, [currentUser])

    
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

    function handleSubmit() {
        // e.preventDefault()
        fetch(`/api/conversations`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: chatName
            })
        })
        .then(resp => resp.json())
        .then(conv => {
            console.log(conv.id)

            setConversationID(conv.id)
            const convoID = conv.id;
            [...deleteableMembers, currentUser].forEach(dm => {
                fetch('/api/userConversations', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        user_id: dm.id,
                        conversation_id: convoID
                    })
                })
            })
        })

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
            <form className="create" onSubmit={e => {e.preventDefault()
            handleSubmit()
            setSubmittedForm(true)}}>
                <Search setNameSearchText={setNameSearchText} />
                {displayRemove}
                <button type="submit">Create Chat With Selected Users</button>
                {displayAddUsers}
                <label>Name: </label>
                <input onChange={(e)=>{setChatName(e.target.value)}}  type="text" name="create" placeholder="Optional" />
            </form>

        </div>
        </>
    )
}

export default Create;
