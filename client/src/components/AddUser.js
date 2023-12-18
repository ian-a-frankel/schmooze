function AddUser({user}) {



    return(
        <div className="user">
            <p>{user.full_name}</p><button>Add</button>
        </div>
    )
}

export default AddUser;