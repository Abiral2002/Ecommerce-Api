import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Avatar } from '@mui/material'
import SideBar from './SideBar'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getUser } from '../../store/userSlice'
import { getCart } from '../../store/cartSlice'
import Login from '../Login/Login'

function HeaderIcons() {

    const user=useSelector(getUser)
    const cart=useSelector(getCart)

    const [userSideBar,setUserSideBar]=useState(false)
    const [cartSideBar,setCartSideBar]=useState(false)

    document.addEventListener("click",(e)=>{
      if (!e.target.closest("#avatar_menu")){
        setUserSideBar(false)
      }
      if (!e.target.closest("#cart_menu")){
        setCartSideBar(false)
      }
      
    })

    const setSideBarFalse=()=>{
      setUserSideBar(false)
      setCartSideBar(false)
    }
  return (
    <div className='avatar_nav'>
    <div className='flex flex-row bg-white border-2 border-primary hover:border-secondary transition-all p-2 justify-center items-center'>
        <div id="avatar_menu" className='relative' >       
            <Avatar  className="user_avatar cursor-pointer " onClick={()=>setUserSideBar(!userSideBar)} sx={{width:"30px",height:"30px"}} src={user?user.profile.avatar.indexOf("h")===-1?`http://localhost:65000/images/users/${user.profile.avatar}`:user.profile.avatar:""}  />
            {user?<SideBar close={setSideBarFalse} value={userSideBar} keys="user"/>:<Login close={setSideBarFalse} value={userSideBar}/>}
            
        </div>
        <div id='cart_menu'>
          <div className='relative cursor-pointer' onClick={()=>setCartSideBar(true)}>
            <ShoppingCartIcon className='text-gray-500 ml-2 hover:text-secondary ' sx={{width:"30px",height:"30px "}}  />
            <span className='absolute left-8 -bottom-1 bg-primary text-white text-sm rounded-lg w-5 h-5 align-top'>{cart.cartNumber}</span>
          </div>
          <SideBar close={setSideBarFalse} value={cartSideBar} keys="cart"/>
        </div>
    </div>
    </div>
  )
}

export default HeaderIcons