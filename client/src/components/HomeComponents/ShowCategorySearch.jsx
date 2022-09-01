import React from 'react'
import { useState } from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ShowCategorySearch() {

    const [products,setProducts]=useState([])

    return (
        <div className=' relative mt-5 flex w-full'>
            <button className='absolute p-3 top-1/2 left- hover:scale-x-125 hover:scale-y-125 transition-all bg-white rounded-full'><ChevronLeftIcon/></button>
            <button className='absolute p-3 top-1/2 right-0 hover:scale-x-125 hover:scale-y-125 bg-white transition-all rounded-full'><ChevronRightIcon/></button>
            <div className='flex flex-col'>
                <div className='flex'></div>              
            </div>
        </div>
    )
}

export default ShowCategorySearch