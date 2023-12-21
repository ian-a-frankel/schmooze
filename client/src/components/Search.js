


function Search({setNameSearchText}) {
    return (
        <div >
          <label >Search Users:</label><br/>
            
          <input onChange={(e)=> setNameSearchText(e.target.value)}  type="text" id="search" placeholder="Type username" />
        </div>
      );
}

export default Search;