

import React from 'react';
import {Link} from "react-router-dom"

function Chat({ conversation }) {
  console.log(conversation.conversation)
  if (conversation.conversation.messages.length > 0) {
  return (
    <>
      <div className="conversation-container">
        <h3>{conversation.conversation.name}</h3>
        <p>Last Message: {conversation.conversation.messages.slice(-1)[0].text}</p>
        <p>Sent by: {conversation.conversation.messages.slice(-1)[0].user.full_name}</p>
        <p>Date Sent: {conversation.conversation.messages.slice(-1)[0].date_sent}</p>
        <p>Unread messages: {conversation.unread}</p>
        <Link to={`/conversations/${conversation.conversation.id}`}>Go to Conversation</Link>
      </div>
    </>
  );
}else {
return (
  <>
    <div className="conversation-container">
      <h3>{conversation.conversation.name}</h3>
      <p>No messages yet!</p>
      <Link to={`/conversations/${conversation.conversation.id}`}>Go to Conversation</Link>
    </div>
  </>
);
}
}
export default Chat;