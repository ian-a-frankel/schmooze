function AddUser({user, handleAdd, setTargetUser}) {



    return(
        <div >
            <p>{user.full_name}</p>
            <button className="adduser" onMouseDown={(e) => setTargetUser(user)} onMouseUp={e => 
                {   e.preventDefault()
                    handleAdd(e)    
            }} onClick={e => {e.preventDefault()}} key={user.id}>Add</button>
        </div>
    )
}

export default AddUser;