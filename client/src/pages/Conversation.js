import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import NavBar from "../components/NavBar";
import {io} from 'socket.io-client' 
let socket;

function Conversation({currentUser}) {
    const bottomRef = useRef(null)
    const [ucs, setUcs] = useState([])
    const [currentUcid, setCurrentUcid] = useState(0)

    const params = useParams()
    const conv_id = params.id
    console.log(conv_id)
    
    
    const [currentUsers, setCurrentUsers]=useState([])
    const [newMessage, setNewMessage]=useState({
        text : '',
        user: null,
        user_id: null,
        conversation_id: conv_id
    })
    
    const [messages, setmessages] = useState([])
    
    useEffect(() => {
        if(currentUser) {
            console.log(currentUser)
            fetch(`/api/conversations/${conv_id}`)
            .then(resp => resp.json())
            .then(data => {
                for (let uc of data['userConversations']) {
                    if (uc.user_id === currentUser.id) {
                        setCurrentUcid(uc.id)
                        fetch(`/api/userConversations/${uc.id}`, {                            
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                                "Accept": "application/json"
                            },
                            body: JSON.stringify({unread: -1})
                        })
                        
                    }
                }
                setmessages(data['messages'])
                setCurrentUsers(data.userConversations.map(userConv => userConv.user.full_name))
                setUcs(data['userConversations'])
                console.log(currentUser.full_name)
                setNewMessage({ ...newMessage, user: currentUser, user_id: currentUser.id})
            })


        
            
    }
    }, [currentUser])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(`message${conv_id}`, (chat) => {
            console.log(chat)
            setmessages(messages => [...messages, chat])
            console.log(currentUser)
            fetch(`/api/userConversations/${currentUser.id}`, {                            
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({unread: -1})
                }
            )
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    function handleAddNewMessage() {
        console.log(currentUser.id)
        fetch("/api/messages", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            body: JSON.stringify(newMessage)
        })
        .then(resp => resp.json())
        .then(data => {
            for (let uc of ucs) {
                if (uc.user_id !== currentUser.id) {
                    fetch(`/api/userConversations/${uc.id}`, {                            
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({unread: 1})
                    })
                }
            }
        })
        
    }
    
    function msgarray() {
        let messages_array = []
        let messages_keys = []
        for (let msg of messages) {
            if (msg.id && !messages_keys.includes(msg.id)) {
                messages_array.push(msg)
                messages_keys.push(msg.id)
            }
        }

        return messages_array
    }


    useEffect(()=> {
        bottomRef.current?.scrollIntoView();
    }, [messages])
    
    const userBox = currentUsers.map((user, index) => {
        return (
            <p key={index} style={{ margin: '4px ', fontWeight: 'bold' }}> {user} </p>
        )
    })
    
    const chatbox = msgarray().map((msg) => {

        return <SingleMessage key={msg.id} msg={msg} />
    })

    return(
        <>
        <NavBar currentUser={currentUser} />
        <div className="message">
            <div id ='chat-box'>
            {chatbox}
            </div>
            <div id="user-box">
                <p>Schmoozers: </p>
            {userBox}
            </div>
            </div>
            <form className="message-form" onSubmit={(e) => {
                e.preventDefault()
                handleAddNewMessage();
                e.target.reset();
                setNewMessage({...newMessage, text: ''})

            }}>
                <label>New Message</label>
                <input
                    type="text"
                    name="new_message"
                    placeholder="Type here"
                    onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value})}
                />
                <button id='createchat' ref={bottomRef} type="submit">Send</button>
                </form>
        </>
    )
}

export default Conversation;


