import React from 'react'
import ContactUsForm from '../ContactUsPage/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className=' w-full mx-auto flex justify-center mt-[140px] ' >

      <div className=' w-11/12 flex flex-col items-center justify-center  gap-[10px] max-w-maxContent ' >

        <div className='h-[80px] gap-[20px] w-[600px] flex flex-col '>
          <h1 className=' text-center leading-[44px] text-[36px] w-[600px] h-[44px]  text-richblack-5 font-semibold' >
            Get in Touch
          </h1>
          <p className='text-center leading-[24px] text-[16px] w-[600px] h-[24px]  text-richblack-300 font-medium'>
            We’d love to here for you, Please fill out this form.
          </p>
        </div>

        <div className='w-11/12 flex justify-center p-[32px]  ' >
          <ContactUsForm />
        </div>

      </div>


    </div>
  )
}

export default ContactFormSection
