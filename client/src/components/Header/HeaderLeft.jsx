import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import Login from '../Login/Login';
import Search from './Search/Search';

function HeaderLeft() {

    
    return (
    <div className="header_left">
        <a href='http://localhost:3000'><img className="app_logo" src="/logo.png" alt="app-logo" /></a>
        {/* mat icon */}
          <Search/>
  
    </div>
  )
}

export default HeaderLeft