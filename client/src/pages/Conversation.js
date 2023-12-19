import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import NavBar from "../components/NavBar";


function Conversation({currentUser}) {

    const bottomRef = useRef(null)

    const params = useParams()
    const conv_id = params.id
    console.log(conv_id)
    const [userId, setUserId]=useState(1)

    const [newMessage, setNewMessage]=useState({
        text : '',
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
            setUserId(currentUser.id)
        })
    }
    }, [currentUser])

    function handleAddNewMessage(event){
        event.preventDefault()
        console.log(currentUser.id)
        console.log(userId)
        fetch("/api/messages", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
            body: JSON.stringify(newMessage)
        })
        .then(response => response.json())
        .then(newMes => {
            console.log(newMes)
            setmessages([...messages, newMes])
        })
        }

    useEffect(()=> {
        bottomRef.current?.scrollIntoView();
    }, [messages])
    
    
    const chatbox = messages.map((msg) => {
        return <SingleMessage key={msg.id} msg={msg} />
    })

    return(
        <>
        <NavBar />
        <div className="message">
            {chatbox}
            <form className="message-form" onSubmit={(e) => {
                handleAddNewMessage(e);
                console.log(newMessage);
            }}>
                <label>New Message</label>
                <input
                    type="text"
                    name="new_message"
                    placeholder="Type here"
                    value={newMessage.text} // <-- Update this line
                    onChange={(e) => setNewMessage({ ...newMessage, text: e.target.value, user_id: userId})}
                />
                <button ref={bottomRef} type="submit">Send</button>
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
