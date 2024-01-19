import React from 'react'
import ContactUsForm from '../components/core/ContactUsPage/ContactUsForm'
import { TiMessages } from "react-icons/ti";
import { GiWorld } from "react-icons/gi";
import { IoMdCall } from "react-icons/io";
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider'
const ContactUs = () => {
    return (
        <div className='' >

            <div className='flex w-11/12 h-[979px] max-w-maxContent mx-auto gap-[52px] p-[42px] mt-[50px]  justify-center  '>

                <div className='flex bg-richblack-800 flex-col rounded-md w-[450px] h-[390px] p-[24px] gap-[24px]  '>

                    <div className='flex gap-[9px] p-[12px]  ' >
                        <div className='w-[24px] h-[24px]   text-richblack-300 '>
                            <TiMessages className='w-[24px] h-[24px]' />
                        </div>

                        <div className='flex flex-col w-[345px] h-[74px] gap-[2px] '>
                            <h1 className=' text-richblack-5 text-[18px] leading-[26px] font-semibold ' >Chat on us</h1>
                            <p className=' text-richblack-300 h-[22px] text-[14px] leading-[22px] font-semibold ' >Our friendly team is here to help.</p>
                            <p className=' text-richblack-300 text-[14px] leading-[22px] font-semibold ' >anurawat1014@mail address</p>
                        </div>
                    </div>

                    <div className='flex gap-[9px] p-[12px]  ' >
                        <div className='w-[24px] h-[24px]   text-richblack-300 '>
                            <GiWorld className='w-[24px] h-[24px]' />
                        </div>

                        <div className='flex flex-col w-[345px] h-[74px] gap-[2px] '>
                            <h1 className=' text-richblack-5 text-[18px] leading-[26px] font-semibold ' >Visit Us</h1>
                            <p className=' text-richblack-300 h-[22px] text-[14px] leading-[22px] font-semibold ' >Come and say hello at our office HQ.</p>
                            <p className=' text-richblack-300 text-[14px] leading-[22px] font-semibold ' >Here is the location/ address</p>
                        </div>
                    </div>

                    <div className='flex gap-[9px] p-[12px]  ' >
                        <div className='w-[24px] h-[24px]   text-richblack-300 '>
                            <IoMdCall className='w-[24px] h-[24px]' />
                        </div>

                        <div className='flex flex-col w-[345px] h-[74px] gap-[2px] '>
                            <h1 className=' text-richblack-5 text-[18px] leading-[26px] font-semibold ' >Call Us</h1>
                            <p className=' text-richblack-300 h-[22px] text-[14px] leading-[22px] font-semibold ' >Mon - Fri From 8am to 5pm</p>
                            <p className=' text-richblack-300 text-[14px] leading-[22px] font-semibold ' >+847 685 6306</p>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col  items-center w-[698px] h-[899px] p-[32px] gap-[32px] rounded-md border-richblack-500 border-[1px] '>

                    <div className='w-[594px] h-[124px]  flex flex-col gap-[32px]'>
                        <h1 className=' text-richblack-5 text-[36px] font-semibold leading-[44px]' >Got a Idea? We’ve got the skills. Let’s team up</h1>
                        <p className=' text-richblack-300 text-[16px] leading-[24px]'>Tall us more about yourself and what you’re got in mind.</p>
                    </div>

                    <div className='h-[539px] w-[594px]  ' >
                        <ContactUsForm />
                    </div>

                </div>


            </div>

            {/* Reviws from Other Learner */}
            
            <div className='flex-col relative justify-between mx-auto w-11/12 max-w-maxContent p-5 mt-16 mb-72 '>
            <h1 className="text-center text-4xl  text-richblack-5 font-semibold mt-8">
                Reviews from other learners
            </h1>
                <div className=' w-full  flex justify-center items-center    ' > 
                        <ReviewSlider />
            </div>
            </div>

            {/* Review section */}
            <div className='mt-[100px]'>
            <Footer />
            </div>




        </div>
    )
}

export default ContactUs
