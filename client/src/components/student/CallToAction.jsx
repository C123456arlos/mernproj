import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>learn anything anytime anywhere</h1>
      <p className='text-gray-500 sm:text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, ad? Repellendus quaerat officiis, suscipit qui distinctio ducimus provident sint excepturi, ut aspernatur ipsum sit totam eaque incidunt earum quos animi?</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>get started</button>
        <button className='flex items-center gap-2'>learn more <img src={assets.logo} className='size-20' alt='arrow icon'></img></button>
      </div>
    </div>
  )
}

export default CallToAction