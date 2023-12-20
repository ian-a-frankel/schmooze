function AddUser({user, handleAdd, setTargetUser}) {



    return(
        <div className="user">
            <p>{user.full_name}</p><button id='createchat' onMouseDown={(e) => setTargetUser(user)} onMouseUp={e => 
                {   e.preventDefault()
                    handleAdd(e)
                    
            }} onClick={e => {e.preventDefault()}} key={user.id}>Add</button>
        </div>
    )
}

export default AddUser;