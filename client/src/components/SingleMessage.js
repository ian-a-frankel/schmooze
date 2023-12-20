
function SingleMessage({msg}) {

    console.log(msg)

    return(
        <div className="message-box">

            <h3 id='textmsg' key={msg.id}>{msg.text}</h3>
            <div className="user">
            <img id='avatar' src={msg.user.image}/>
            <h4>{msg.user.full_name}</h4><h5>{msg.date_sent}</h5>
            {/* <select name="dropdown" id="dropdown"> 
                <option value="edit" name="edit" ><button>Edit</button></option> 
                <option value="delete" name="delete" ><button>Delete</button></option>
            </select><br/> */}
            </div>

        </div>
    )
}

export default SingleMessage;