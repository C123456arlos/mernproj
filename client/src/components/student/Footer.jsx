import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32
      py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'>
          <img src={assets.logo} alt='logo' className='size-32'></img>
          <p className='mt-6 text-center md:text-left text-sm text-white/80'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates nam nemo quaerat odit cupiditate at eaque itaque cumque veniam debitis voluptatibus suscipit recusandae hic sed, minima quod eius consequatur aliquid?</p>
        </div>
        <div className='flex flex-col md:items-start items-center w-full'>
          <h2 className='font-semibold text-white mb-5'>company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
            <li><a href='#'>home</a></li>
            <li><a href='#'>about us</a></li>
            <li><a href='#'>contact us</a></li>
            <li><a href='#'>privacy policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>subscribe to our newsletter</h2>
          <p className='text-sm text-white/80'>the latest news articles and resources sent to your inbox weekly</p>
          <div className='items-center gap-2 pt-4 flex'>
            <input type='email' placeholder='enter your email' className='border border-gray-500/30 bg-gray-800 text-gray-500 
            placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'></input>
            <button className='bg-blue-600 w-24 h-9 text-white rounded'>subscribe</button>
          </div>
        </div>
      </div>
      <p className='py-4 text-center text-xs md:text-sm text-white/60'>copyright 2025 &copy; app all rights reserved</p>
    </footer>
  )
}

export default Footer