import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import SideBarCategory from './SideBarCategory'
import { CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function SideBar() {

    const [category,setCategory]=useState([])

    useEffect(()=>{
        axios.get("http://localhost:65000/product/all-category").then(response=>{
            setCategory(response.data.data)
        })
    },[])

    return (
    <div className='hidden lg:block relative h-sidebar flex-col justify-center items-center mt-10 w-2/12 bg-white z-20 shadow-md'>
        <div className='flex flex-col justify-center items-center text-center top-5 left-0 right-0'>
            <p className=' text-lg font-semibold'>Search By Category</p>
            <hr className='border-t-2 mt-1 w-10/12 border-primary'/>
        </div>
        <div className='right-0 justify-center items-center flex flex-col'>
            
            {category[0]===undefined?<CircularProgress className=''/>:
                category.map((data,index)=>{
                    return <SideBarCategory key={index} category={data.category} subCategory={data.subCategory} />
                })
            }
        </div>
    </div>
  )
}

export default SideBar