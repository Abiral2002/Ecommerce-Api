import axios from 'axios'
import React from 'react'
import {useSelector} from "react-redux"
import { useState } from 'react'
import {getUser} from "./../../store/userSlice"
import EditIcon from '@mui/icons-material/Edit';


function ProfileSideBar() {
    const user=useSelector(getUser)
    const userInitails={
        fName:user.profile.fName,
        lName:user.profile.lName
    }
    const [userPorfile,setUserProfile]=useState(userInitails)
    const sendEditProfile=(e)=>{
        e.preventDefault()
        if (userInitails!==userPorfile){

        }

        if (picture){

        }
    }

    const [picture,setPicture]=useState()

    const inputProfile=(prop)=>{
        return (
            <label className='mb-3'>
                <p className=' text-left font-light'>{prop.title}</p>
                <input className='w-full text-xl focus:outline-none' value={prop.value} name={prop.name} onChange={(e)=>(setUserProfile(prev=>({...prev,[prop.name]:e.target.value})))}/>
                <hr/>
            </label>
        )
    }

    return (
        <div className='h-full relative flex flex-col justify-center items-center'>
            <div className='flex flex-wrap flex-col absolute top-20 items-center justify-around w-8/12 mb-5'>
                <div className='flex flex-col justify-center items-center h-5/6'>
                    <img className='w-20 rounded-full' src={user.profile.avatar.indexOf("h")===-1?`http://localhost:65000/images/users/${user.profile.avatar}`:user.profile.avatar} />
                    <hr/>
                    <button className='font-semibold text-sm'>
                        <EditIcon sx={{width:"20px"}}/> Change Profile
                    </button>
                </div>
                
                <div className='flex flex-col justify-center'>
                    <p className='text-xl font-semibold text-center text-black'>{user.profile.fName+" "+user.profile.lName}</p>
                    <p className='text-lg font-light text-center text-black'>{user.email}</p>
                </div>
            </div>
            <form className='flex w-10/12 flex-col' onSubmit={(e)=>{sendEditProfile(e)}}>
                {inputProfile({
                    name:"fName",
                    value:userPorfile.fName,
                    title:"First Name"
                })}
                {inputProfile({
                    name:"lName",
                    value:userPorfile.lName,
                    title:"Last Name"
                })}
                <label className='mb-3'>
                    <p className='text-left font-light'>Email</p>
                    <input className='w-full text-xl focus:outline-none' value={user.email}/>
                    <hr/>
                </label>
                <label className='text-left mt-5' >
                    <button type='submit' className='text-lg font-semibold p-3 disabled:bg-gray-200 disabled:hover:border-white disabled:text-white text-white bg-primary border-2 border-white rounded-md hover:border-primary hover:bg-white hover:text-black transition-all'>Change Profile</button>
                </label>
            </form>
            <div className='absolute flex flex-grow-0 flex-wrap bottom-4 text-left w-10/12'>   
                <button className='  text-lg font-semibold p-2 px-4 text-white bg-primary border-2 border-white rounded-md hover:border-primary hover:bg-white hover:text-black transition-all'>My Orders</button>
                <button className='text-lg font-semibold p-2 px-4 text-white bg-primary border-2 border-white rounded-md hover:border-primary hover:bg-white hover:text-black transition-all'>Logout</button>
            </div>
        </div>
  )
}

export default ProfileSideBar