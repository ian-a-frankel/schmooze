import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SingleMessage from "../components/SingleMessage";
import NavBar from "../components/NavBar";

function Conversation({currentUser}) {

    const params = useParams()
    const id = params.id
    
    const [messages, setmessages] = useState([])
    
    useEffect(() => {
        if(currentUser) {
        fetch(`/api/users/${currentUser.id}/conversations/${id}`)
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setmessages(data)
        })
    }
    }, [currentUser])
    
    const chatbox = messages.map((msg) => {
        return <SingleMessage key={msg.id} msg={msg} />
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

export default Conversation;