import ChatBox from "../components/ChatBox";

function Message() {

    const chatbox = 1

    return(
        <div className="message">
            <ChatBox />
            <form className="message-form">
                <label>New Message</label>
                <input  type="text" name="new_message" placeholder="Type here" />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Message;