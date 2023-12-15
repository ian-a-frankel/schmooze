import User from "./User";


function Search() {
    return (
        <div className="searchbar">
          <label>Search Users:</label>
          <User />
          <input type="text" id="search" placeholder="Type username" />
        </div>
      );
}

export default Search;