import React from 'react'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function FrontImage() {
    const imgCaurosel=(button)=>{
        let offset=button==="next"?1:-1
        const slides=document.querySelector("[data-slide]")
        const activeSlide=slides.querySelector("[data-active]")
        let newIndex=Array.from(slides.childNodes).indexOf(activeSlide)+offset
        if (newIndex < 0) newIndex=slides.children.length-1
        if (newIndex >= slides.children.length) newIndex=0
        slides.children[newIndex].dataset.active=true
        delete activeSlide.dataset.active

    }

  return (
    <div className='relative lg:h-sidebar h-bgImage md:h-sidebar '>
        <button onClick={(e)=>imgCaurosel("next")} className='absolute z-10 top-1/4 right-0 h-3/6 p-3 bg-gray-800 text-white opacity-20 hover:opacity-80 transition-all rounded-tr-none rounded-br-none rounded-md'> <ChevronRightIcon/> </button>
        <button onClick={(e)=>imgCaurosel("prev")} className='absolute z-10 top-1/4 left-0 h-3/6 p-3 bg-gray-800 rounded-md text-white opacity-20 hover:opacity-80 rounded-tl-none rounded-bl-none transition-all roun'> <ChevronLeftIcon/>  </button>
        <div className='w-full h-4/6' data-slide>
            <img className='img-slider w-full lg:h-sidebar h-bgImage md:h-sidebar transition-all top-0 absolute bg-fixed' data-active="true" alt='' src='https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8&w=1000&q=80'/>
            <img className='img-slider w-full lg:h-sidebar h-bgImage md:h-sidebar transition-all top-0 absolute bg-fixed' data-active="false" alt='' src='https://cdn.shopify.com/s/files/1/0070/7032/files/trending-products_c8d0d15c-9afc-47e3-9ba2-f7bad0505b9b.png?format=jpg&quality=90&v=1614559651'/>
            <img className='img-slider w-full lg:h-sidebar h-bgImage md:h-sidebar transition-all top-0 absolute bg-fixed' data-active="false" alt='' src='https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/all-products-20170125054108782.gif'/>
            <img className='img-slider w-full lg:h-sidebar h-bgImage md:h-sidebar transition-all top-0 absolute bg-fixed' data-active="false" alt='' src='https://voicebot.ai/wp-content/uploads/2019/09/amazon-alexa-event-sept-2019.jpg'/>
        </div>
    </div>
  )
}

export default FrontImage