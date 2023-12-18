import { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";
import NavBar from "../components/NavBar";

function Message() {

    const [messages, setmessages] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:3000/messages')
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setmessages(data)
            
        })
    }, [])
    
    const chatbox = messages.map((msg) => {
        return <ChatBox key={msg.id} msg={msg} />
    })

    return(
        <>
        <NavBar />
        <div className="message">
            {chatbox}
            <form className="message-form">
                <label>New Message</label>
                <input  type="text" name="new_message" placeholder="Type here" />
                <button type="submit">Send</button>
            </form>
        </div>
        </>
    )
}

export default Message;