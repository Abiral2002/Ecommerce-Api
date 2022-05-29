import React from 'react'
import { useState } from 'react';
import HeaderIcons from './HeaderIcons'

function HeaderRight() {
    const [policies,setPolicies]=useState(false)
    return (
    <div className='header_right flex items-center justify-around'>
          <div className='relative' id='policies_menu'>
            <button className='m-1 rounded-md border-1 bg-white  p-2 transition-all font-semibold hover:bg-secondary shadow-sm shadow-white hover:text-white' onClick={()=>setPolicies(!policies)}>Our Policies</button>
            <ul className={!policies?'absolute top-full w-48 bg-white rounded-md scale-y-0':'absolute top-full w-48 bg-white rounded-md scale-y-1 origin-top translate-y-1 transition-transform'}>
                <li><p className='p-2 text-lg transition-all cursor-pointer hover:bg-gray-200'>Terms and conditions</p></li>
                <li><p className='p-2 text-lg transition-all cursor-pointer hover:bg-gray-200'>Privacy Policies</p></li>
                <li><p className='p-2 text-lg transition-all cursor-pointer hover:bg-gray-200'>About Us</p></li>
                <li><p className='p-2 text-lg transition-all cursor-pointer hover:bg-gray-200'>Contact Us</p></li>
            </ul>
          </div>
          <HeaderIcons/>
    </div>
  )
}

export default HeaderRight