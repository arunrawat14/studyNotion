import React from 'react'
import HighlightText from './HighlightText'
import plan from '../../../assets/Images/Plan_your_lessons.png'
import know from '../../../assets/Images/Know_your_progress.png'
import compare from '../../../assets/Images/Compare_with_others.png'
import CTAbutton from './CTAbutton'

export default function LearningLanguageSection() {
  return (
    <div className='flex flex-col mt-40 justify-center gap-[20px] items-center mb-6 '>

      <div className='w-[760px] text-[36px] h-[44px] align-middle'>
        Your swiss knife for
        <HighlightText text={"learning any language"} />
      </div>

      <div className='w-[760px] h-[48px] text-[16px] text-richblack-500   '>
        Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
      </div>

      <div className='flex relative item-center justify-center   '>
          <img className=' -mr-32 object-contain  ' src={know} alt="" />
          <img className=' object-contain ' src={compare} alt="" />
          <img className='object-contain -ml-32' src={plan} alt="" />
      </div>

      <CTAbutton  active={true} linkto={"/signup"} >
        Learn More
      </CTAbutton>


    </div>
  )
}
