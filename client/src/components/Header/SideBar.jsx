import React from 'react'
import ProfileSideBar from './ProfileSideBar'
import CloseIcon from '@mui/icons-material/Close';
import CartSideBar from './Cart/CartSideBar';

function SideBar(props) {

    const className=props.value?'sidebar origin-right transition-all scale-x-1 fixed flex-col flex right-0 bg-white rounded-lg  sm:w-full border-black-400 lg:w-3/12 md:w-4/12 top-0 h-full w-full z-10 bg-transparent backdrop-blur-lg':
    'sidebar origin-right transition-all scale-x-0 fixed flex-col flex right-0 bg-white rounded-lg border-l-2 border-black-400 top-0 h-full w-3/12 z-10 '
    return (
    <div className={className} id="sidebar">
        <button className='z-20 fixed top-0 right-0 p-2 m-3 rounded-full text-black cursor-pointer hover:bg-secondary hover:text-white transition-all '>
            <CloseIcon onClick={props.close}/>
        </button>
        {props.keys==="user"?<ProfileSideBar/>:<CartSideBar/>}
        
    </div>
  )
}

export default SideBar