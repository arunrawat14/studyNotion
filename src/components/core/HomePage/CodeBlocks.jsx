import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import CTAbutton from './CTAbutton'
import { TypeAnimation } from 'react-type-animation'
export default function CodeBlocks({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColour
}) {
    return (
        <div className={`flex ${position} my-20 justify-between gap-32 `}>

            {/* section one */}
            <div className='w-[55%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold'>
                    {subheading}
                </div>

                <div className='flex gap-7 mt-7'>
                    <CTAbutton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center' >
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAbutton>

                    <CTAbutton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAbutton>
                </div>

            </div>

            <div className='w-[45%] relative   '>

                <div className=''></div>

                <div className='w-[100%] flex gap-3 absolute bg-richblack-800   '>
                    <div className='text-center flex flex-col w-[10%] text-richtblack-400 font-inter  font-bold '>
                        <p>1</p>
                        <p>2</p>
                        <p>3</p>
                        <p>4</p>
                        <p>5</p>
                        <p>6</p>
                        <p>7</p>
                        <p>8</p>
                        <p>9</p>
                        <p>10</p>
                        <p>11</p>
                    </div>

                    <div className={`w-[90%] flex flex-col gap-2 font-mono font-bold ${codeColour} h-[100%]`}>
                        <TypeAnimation
                            style={{ whiteSpace: 'pre-line', height: '195px', display: 'block' }}
                            sequence={[
                                codeblock,
                                10000,
                                '',
                            ]}
                            repeat={Infinity}
                        />
                    </div>

                </div>


            </div>



        </div>
    )
}
