function RemoveUser({user, handleRemove, setTargetUser}) {



    return(
        <div>
            <p>{user.full_name}</p><button className="adduser" onClick={e => {e.preventDefault()}} onMouseDown={(e) => setTargetUser(user)} onMouseUp={e => handleRemove(e)} key={user.id}>Remove</button>
        </div>
    )
}

export default RemoveUser;