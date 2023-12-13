import Search from "../components/Search";

function Create() {
    return(
        <div className="create" >

            <form className="create">
                <Search />
                <label>Name: </label>
                <input  type="text" name="create" placeholder="Optional" />
                <button type="submit">Create</button>
            </form>

        </div>
    )
}

export default Create;
