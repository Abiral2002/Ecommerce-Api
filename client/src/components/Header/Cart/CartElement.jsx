import React from 'react'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


function CartElement(props) {
    const [stock,setStock]=useState(props.stock)
    
    return (
    <div className='relative w-11/12 border-2 rounded-md my-8 items-center justify-center flex flex-col'>
        <button className='z-20 absolute -top-5 right-1 backdrop-blur-lg p-2 bg-white rounded-full text-black cursor-pointer hover:bg-secondary hover:text-white transition-all '>
            <CloseIcon onClick={props.close}/>
        </button>
        <div className='flex'>
            <img className='w-4/12 rounded-md mr-3' src='https://cdn.shopify.com/s/files/1/0419/1525/products/1024x1024-Men-Explorer-BlackMatte-3.4.jpg?v=1602090871'/>
            <div className='flex flex-col justify-between'>
                <div className='flex flex-col justify-start'>
                    <p className='text-2xl font-semibold text-left'>Boots Goolden Boots</p>
                    <div className='text-xl text-left font-semibold'><span className='text-lg font-semi text-gray-500'>Rs. </span>100.000</div>
                </div>
                <div className='text-center'>
                    <div className='flex m-auto justify-center'>
                    <button onClick={(e)=>{
                        stock ===0 ? setStock(0):setStock(prev=>prev-1)
                        }} className='bg-white py-1 rounded-tl-sm rounded-ll-sm  px-3 font-semibold border-r-2 border-gray-400'><RemoveIcon/></button>
                    <input type="number" value={stock} className='number w-2/12 focus:outline-none font-semibold text-lg text-center border-gray-400'/>
                    <button onClick={(e)=>setStock(prev=>prev+1)} className='bg-white p-1 px-3 font-semibold border-l-2 border-gray-400'><AddIcon></AddIcon></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartElement