


function Search({setNameSearchText}) {
    return (
        <div className="searchbar">
          <label>Search Users:</label>
            
          <input onChange={(e)=> setNameSearchText(e.target.value)}  type="text" id="search" placeholder="Type username" />
        </div>
      );
}

export default Search;