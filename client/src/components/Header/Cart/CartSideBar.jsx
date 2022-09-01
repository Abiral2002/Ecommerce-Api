import React from 'react'
import CartElement from './CartElement'

function CartSideBar() {

  return (
    <div className='flex flex-col items-center justify-center h-full'>
        {/* Cart Head */}
        <div className='absolute top-6 text-4xl font-semibold text-gray-600'>Cart</div>
        {/* Cart Body */}
        <div className='relative bottom-11 flex flex-col justify-center items-center w-full h-4/6 overflow-y-scroll '>
          <CartElement stock={2}/>
        </div>
        {/* Cart Foot */}
        <div className='absolute border-t-2 border-primary pt-4 flex items-center justify-center flex-col bottom-0 w-full'>
          <div className='flex justify-between w-10/12'>
            <div className='text-xl'>Total</div>
            <div className='text-2xl font-normal'><span className='text-lg font-semi text-gray-500'>Rs. </span>100.000</div>
          </div>
          <button className='p-2 w-10/12 my-9 text-xl font-semibold bg-secondary border-2 text-gray-200 rounded-md hover:bg-white hover:text-black transition-all'>
            Place order
          </button>
        </div>
    </div>
  )
}

export default CartSideBar