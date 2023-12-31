import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import NavBar from "../components/NavBar";
import './ListOfChats.css'

function ListOfChats({currentUser,URL, pinger, setPinger}) {
    
    const [userChats, setUserChat] = useState([])
    console.log(currentUser)
    useEffect(() => {
        console.log(currentUser)
        if (currentUser){
            fetch(URL+`/users/${currentUser.id}/conversations`)
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                setUserChat(data)
            })
        }

    }, [currentUser])

    const emptyChats=userChats.filter(a=>!a.conversation.messages.length)
    const notEmptyChats=userChats.filter(a=>a.conversation.messages.length).sort((a, b) =>
        b.conversation.messages.slice(-1)[0].id - a.conversation.messages.slice(-1)[0].id
    );
    
    const info =  notEmptyChats.concat(emptyChats).map((conversation) => {
        return <Chat key={conversation.id} conversation={conversation} />
    })
    return(
        <>

        <NavBar currentUser={currentUser} pinger={pinger} setPinger={setPinger}/>

        <div className="chatlist">
            {info}
        </div>
        </>
    )
}

export default ListOfChats;