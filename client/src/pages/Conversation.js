import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import NavBar from "../components/NavBar";
import {io} from 'socket.io-client' 
let socket;


function Conversation({currentUser}) {
    const bottomRef = useRef(null)



    const params = useParams()
    const conv_id = params.id
    console.log(conv_id)
    

    const [newMessage, setNewMessage]=useState({
        text : '',
        user: null,
        user_id: null,
        conversation_id: conv_id
    })
    
    const [messages, setmessages] = useState([])
    
    useEffect(() => {
        if(currentUser) {
        fetch(`/api/conversations/${conv_id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setmessages(data['messages'])
            console.log(currentUser.full_name)
            setNewMessage({ ...newMessage, user: currentUser, user_id: currentUser.id})

        })
    }
    }, [currentUser])

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on("message", (chat) => {
            console.log(chat)
            setmessages(messages => [...messages, chat])
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
            console.log(data)
            socket.emit("message", data);
            console.log(newMessage)
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
    

    
    const chatbox = msgarray().map((msg) => {

        return <SingleMessage key={msg.id} msg={msg} />
    })

    return(
        <>
        <NavBar currentUser={currentUser} />
        <div className="message">
            {chatbox}
            <form className="message-form" onSubmit={(e) => {
                e.preventDefault()
                handleAddNewMessage();
                console.log(newMessage);

            }}>
                <label>New Message</label>
                <input
                    type="text"
                    name="new_message"
                    placeholder="Type here"
                    onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value})}
                />
                <button ref={bottomRef} type="submit">Send</button>
                </form>
        </div>
        </>
    )
}

export default Conversation;


