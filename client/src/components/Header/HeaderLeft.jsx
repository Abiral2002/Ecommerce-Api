import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Login from '../Login/Login';

function HeaderLeft() {


    const displaySuggestion=(texts)=>texts.map(data=><p>{data}</p>)
    
    return (
    <div className="header_left">
        <img className="app_logo" src="/logo.png" alt="app-logo" />
        {/* mat icon */}
        <div className="header_inputs">
          <div className="header_search">
            <div>
                <SearchIcon sx={{width:"25px",height:"25px"}} />
            </div>
            <div className='input_suggestion'>
                <input type="text" placeholder="Search for people, jobs, more" defaultValue={""} />
                <div className='suggestions'>
                    {/* {displaySuggestion(["Hello World","Hello World","Hello World",])} */}
                </div>
            </div>
            
          </div>
        </div>
      </div>
  )
}

export default HeaderLeft