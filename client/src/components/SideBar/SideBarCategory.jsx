import React from 'react'
import { useState } from 'react'

function SideBarCategory(props) {

  const [showSub,setShowSub]=useState(false)

  const classValue=showSub?"absolute top-0 left-full flex flex-col w-full bg-white scale-x-1 origin-x transition-all":"scale-x-0 hidden"
  const setSubCategory=({category})=><a href={`http://localhost:3000/search?category=${props.category}&&subcategory=${category}`} ><p className='hover:bg-gray-200 transition-all p-2'>{category.charAt(0).toUpperCase()+category.slice(1)}</p></a>
  return (
    <a href={`http://localhost:3000/search?category=${props.category}`} className='relative w-full flex flex-col text-lg hover:bg-gray-200 p-2 transition-all' onMouseEnter={()=>setShowSub(true)} onMouseLeave={()=>setShowSub(false)}>
                {props.category.charAt().toUpperCase()+props.category.slice(1)}
                <div className={classValue}>
                    {props.subCategory.map(data=>{
                        return setSubCategory({category:data})
                    })}
                </div>
    </a>
  )
}

export default SideBarCategory