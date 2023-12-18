import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import NavBar from "../components/NavBar";

function ListOfChats({currentUser,URL}) {
    
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
    
    // const info = userChats.map((chat) => {
    //     return <Chat key={chat.id} chat={chat} />
    // })
    const info = userChats.map((chat) => {
        return <p key={chat.id}>{chat.id}</p>
    })
    return(
        <>
        <NavBar />
        <div className="message">
            {info}
        </div>
        </>
    )
}

export default ListOfChats;