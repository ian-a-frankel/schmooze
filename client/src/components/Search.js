


function Search({setNameSearchText}) {
    return (
        <div >
          <label id='searchbar' >Search Users:</label>
            
          <input onChange={(e)=> setNameSearchText(e.target.value)}  type="text" id="search" placeholder="Type username" />
        </div>
      );
}

export default Search;