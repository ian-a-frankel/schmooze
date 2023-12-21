import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Search from "../components/Search";
import AddUser from "../components/AddUser";
import RemoveUser from "../components/RemoveUser";
import {useNavigate} from "react-router-dom"
// import './create.css'

function Create({currentUser}) {

    const [allUsers, setAllUsers] = useState([])
    const [deleteableMembers, setDeleteableMembers] = useState([])
    
    const [nameSearchText, setNameSearchText] = useState('')
    const [targetUser, setTargetUser] = useState('')

    const [chatName, setChatName] = useState('')
    const [allConversations, setAllConversations] = useState([])
    const [conversationID, setConversationID] = useState(null)


    const navigate = useNavigate()

    
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
                .then(resp => resp.json())
                .then(data => {console.log(data)
                    if (currentUser.id === data.user_id) {
                        navigate(`/conversations/${data.conversation_id}`)
                    }
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
    <NavBar currentUser={currentUser} />
        <div >
            <form id='createchat' onSubmit={e => {e.preventDefault()
            handleSubmit()
            }}>
                <Search setNameSearchText={setNameSearchText} />
                <label>Chat Name: </label>
                <input onChange={(e)=>{setChatName(e.target.value)}}  type="text" name="create" placeholder="Optional" />
                <div id={deleteableMembers <= 0 ? null: 'displayselecteduser'}>
                {displayRemove}
                </div>
                <button className="create" type="submit">Create Chat With Selected Users</button>
                <div id='displayselecteduser'>
                {displayAddUsers}
                </div>
                
            </form>
        </div>

        </>
    )
}

export default Create;
