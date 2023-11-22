import React from 'react'
import HighlightText from '../HomePage/HighlightText'
const Quote = () => {
  return (
    <div className='text-white w-[1200px] h-[156px]  font-semibold text-[36px]  text-center leading-[52px] '>
      We are passionate about revolutionizing the way we learn. Our innovative platform
      <HighlightText text={"combines technology"}/>
      ,
      <span  className='experties' >
      {" "} expertise
      </span>
      , {" "} and community to create an {" "}
      <span className=' text-brown-300 '>unparalleled educational experience.</span>
    </div>
  )
}

export default Quote
