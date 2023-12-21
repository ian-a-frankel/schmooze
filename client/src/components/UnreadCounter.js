import { useEffect, useState, useRef } from "react";
import {io} from 'socket.io-client' 
let socket;

function UnreadCounter({currentUser, pinger}) {
    
    const [ucids, setUcids] = useState([])
    const [unread,  setUnread] = useState(0)

    useEffect(() => {
        if (currentUser) {
            let newsum = 0
            for (let newm of currentUser.userConversations) {
                newsum += newm.unread
            }
            setUnread(newsum)
        }
    },[currentUser, pinger])

    return <p>Total new messages: {unread + pinger - pinger}</p>
}

export default UnreadCounter