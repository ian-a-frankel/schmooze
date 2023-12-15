function ChatBox() {

    return(
        <div className="message-box">

            <h3>user.message</h3><br/>
            <img src="user.avatar"/><h4>user.username</h4><h5>user.timestamp</h5>
            <select name="dropdown" id="dropdown"> 
                <option value="edit" name="edit" ><button>Edit</button></option> 
                <option value="delete" name="delete" ><button>Delete</button></option>
            </select><br/>

        </div>
    )
}

export default ChatBox;