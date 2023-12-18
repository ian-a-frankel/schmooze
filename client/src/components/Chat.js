
import React from 'react';
import {Link} from "react-router-dom"

function Chat({ conversation }) {
  return (
    <>
      <div className="conversation-container">
        <h3>{conversation.conversation.name}</h3>
        <p>Last Message: {conversation.conversation.messages.slice(-1)[0].text}</p>
        <p>Sent by: {conversation.conversation.messages.slice(-1)[0].user.full_name}</p>
        <p>Date Sent: {conversation.conversation.messages.slice(-1)[0].date_sent}</p>
        <Link to={`/conversation/${conversation.conversation.id}`}>Go to Conversation</Link>
      </div>
    </>
  );
}

export default Chat;