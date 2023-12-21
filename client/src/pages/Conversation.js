import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import NavBar from "../components/NavBar";

import './Conversation.css';
import {io} from 'socket.io-client'
import UnreadCounter from "../components/UnreadCounter"; 
let socket;

function Conversation({currentUser, pinger, setPinger}) {

    const bottomRef = useRef(null)

    const [ucs, setUcs] = useState([])
    const [currentUcid, setCurrentUcid] = useState(0)

    const params = useParams()
    const conv_id = Number(params.id)
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
        if(currentUser && currentUser.userConversations.map(c => c.conversation_id).includes(conv_id)) {
            
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
    }, [currentUser, pinger])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on(`message${conv_id}`, (chat) => {
            if (currentUser && currentUser.userConversations.map(c => c.conversation_id).includes(conv_id)) {
                
                setmessages(messages => [...messages, chat])
                
                fetch(`/api/userConversations/${currentUser.id}`, {                            
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({unread: -1})
                    }
                )
                
            }
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    function handleAddNewMessage() {
        if (currentUser.userConversations.map(c => c.conversation_id).includes(conv_id)) {  
            setmessages([...messages, newMessage])
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
        return <SingleMessage key={msg.id} msg={msg} currentUser={currentUser}/>
    })

    return(
        <>
        <NavBar currentUser={currentUser} pinger={pinger} setPinger={setPinger}/>
        <div className="message">
            <div className ='chat-box'>
            {chatbox}
            </div>
            <div className ="user-box">
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
                <button className='createchat' ref={bottomRef} type="submit">Send</button>
                </form>
                <UnreadCounter currentUser={currentUser} pinger={pinger}/>
        </>
    )
}

export default Conversation;


