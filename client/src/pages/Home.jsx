import React from 'react'
import FrontImage from '../components/HomeComponents/FrontImage'
import ShowCategorySearch from '../components/HomeComponents/ShowCategorySearch'

function Home() {
  return (
    <div className=" flex flex-col flex-wrap lg:mt-10 lg:w-9/12 w-full">
      <FrontImage/>
      <ShowCategorySearch/>
    </div>
  )
}

export default Home