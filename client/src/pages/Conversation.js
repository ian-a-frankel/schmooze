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
    
    const chatbox = msgarray().map((msg) => {

        return <SingleMessage key={msg.id} msg={msg} />
    })

    return(
        <>
        <NavBar />
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
                <button type="submit">Send</button>
                </form>
        </div>
        </>
    )
}

export default Conversation;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import SingleMessage from "../components/SingleMessage";
// import NavBar from "../components/NavBar";
// import io from "socket.io-client";

// function Conversation({ currentUser }) {
//   const params = useParams();
//   const conv_id = params.id;
  
//   const [user_id, setUserId]=useState(1)
//   const [socket, setSocket] = useState(null);
//   const [newMessage, setNewMessage] = useState({
//     text: "",
//     user_id: user_id,
//     conversation_id: conv_id,
//   });

//   const [messages, setMessages] = useState([]); // <-- Add this line

//   useEffect(() => {
//     const newSocket = io("http://localhost:5555", {
//         withCredentials: true,
//         extraHeaders: {
//           "Access-Control-Allow-Origin": "http://localhost:3000"
//         },
//       });
//     setSocket(newSocket);
//     if (currentUser) {
//       fetch(`/api/conversations/${conv_id}`)
//         .then((resp) => resp.json())
//         .then((data) => {
//           console.log(data);
//           setUserId(currentUser.id)
//           setMessages(data['messages']); // <-- Update this line
//         });
//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [currentUser]);

//   useEffect(() => {
//     if (socket) {
//       // Handle incoming messages from the server
//       socket.on("message", (message) => {
//         // Update the state with the new message
//         setMessages((prevMessages) => [...prevMessages, message]);
//       });
//     }
//   }, [socket]);

//   const chatbox = messages.map((msg) => {
//     return <SingleMessage key={msg.id} msg={msg} />;
//   });

//   const sendMessage = (e) => {
//     e.preventDefault();
//     // Emit the new message to the server
//     if (socket) {
//       socket.emit("message", newMessage);
//     }
//     // Update the state with the new message
//     setMessages((prevMessages) => [...prevMessages, newMessage]);

//     // Clear the input field
//     setNewMessage({ ...newMessage, text: "" });
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="message">
//         {chatbox}
//         <form className="message-form" onSubmit={()=>{sendMessage()
//         console.log(newMessage)}}>
//           <label>New Message</label>
//           <input
//             type="text"
//             name="new_message"
//             placeholder="Type here"
//             value={newMessage.text} // <-- Update this line
//             onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value })}
//           />
//           <button type="submit">Send</button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Conversation;