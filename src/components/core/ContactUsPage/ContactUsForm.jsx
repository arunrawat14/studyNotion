import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import codes from '../../../data/countrycode.json'
import { apiConnector } from "../../../services/apiconnecter"
import { contactusEndpoint } from "../../../services/api"

const ContactUsForm = () => {

    const [loading, setLoading] = useState()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        try {
            setLoading(true);
            console.log("data for contact is::>>", data);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
              )
               console.log("Email Res - ", res)
            setLoading(false);
        } catch(error) {
            console.log("SUBMITFORM CONTACT US RESPONSE... ", error.message )
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [reset, isSubmitSuccessful])

    return (

        <div>
            {
            loading ? (
                <div>
                Loading ...
                </div>
            ): 

            ( <form onSubmit={handleSubmit(submitContactForm)}
            className='flex flex-col w-[600px]  max-w-maxContent'>

            <div className='flex flex-col  h-[603px] gap-[36px] p-[32px] text-white '>
                {/* names */}
                <div className='flex w-[536px] h-[76px] gap-[20px]  ' >
                    {/* first Nsme  */}
                    <div className='flex flex-col gap-[6px] w-[258px] h-[76px] ' >
                        <label className='text-[14px]  text-richblack-5 leading-[22px]  font-normal w-[72px] h-[22px]' htmlFor="firstname">First Name</label>
                        <input type="text"
                            name='firstname'
                            id='firstname'
                            className=' bg-richblack-800 text-[16px]  font-medium w-[258px] h-[48px] rounded-md p-[12px] shadow-sm shadow-richblack-400 ' 
                            placeholder='Enter your First Name'
                            {...register("firstname", { required: true })}
                        />
                        {
                            errors.firstname && (
                                <span>
                                    Please Enter Your First Name
                                </span>
                            )
                        }
                    </div>
                    {/* last name  */}
                    <div className='flex flex-col gap-[6px] w-[258px] h-[76px] '>
                        <label className='text-[14px]  text-richblack-5 leading-[22px]  font-normal w-[72px] h-[22px]' htmlFor="lastname">Last Name</label>
                        <input type="text"
                            name='lastname'
                            id='lastname'
                            className=' bg-richblack-800 text-[16px]  w-[258px] h-[48px] rounded-md p-[12px] shadow-sm shadow-richblack-400 ' 
                            placeholder='Enter your Last Name'
                            {...register("lastname")}
                        />
                    </div>
                </div>

                {/* email  */}
                <div className='w-[536px] h-[76px] flex flex-col gap-[6px]  '  >
                    <label className=' text-richblack-5 w-[94px] h-[22px] text-[14px] leading-[22px] 
                         font-medium'
                          htmlFor="email">Email Address</label>
                    <input type="email"
                        id='email'
                        name='email'
                        className=' bg-richblack-800 text-[16px]  font-medium w-[536px] h-[48px] rounded-md p-[12px] shadow-sm shadow-richblack-400 '
                        placeholder='Enter Your Email Address'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>Please Enter Your Email Address</span>
                        )
                    }
                </div>

                {/* phone no. */}

                <div className='flex flex-col  w-[536px] h-[76px] gap-[10px]  ' >
                    <label
                    className=' text-richblack-5 w-[99px] h-[22px] text-[14px] leading-[22px] 
                    font-medium'
                    htmlFor="phonenumber">Phone Number</label>
                    <div className='w-[536px] h-[76px] flex gap-[20px]  ' >
                        {/* drop down */}
                            <select name="dropdown"
                                id='dropdown'
                                className='p-[12px] w-[81px] h-[48px] bg-richblack-800 text-[16px] text-richblack-300 rounded-md  shadow-sm shadow-richblack-400  font-medium'
                                {...register("countrycode", { required: true })}
                            >
                                {
                                    codes.map((code, index)=> {
                                        return (
                                            <option 
                                               
                                            key={index} value={code.code } >
                                                {code.code} - {code.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                       

                        <div>
                            <input type="number"
                                name='phonenumber'
                                id='phonenumber'
                                placeholder='12345 67890'
                                className='p-[12px] w-[435px] h-[48px] bg-richblack-800 text-[16px] text-richblack-300 rounded-md  shadow-sm shadow-richblack-400  font-medium'
                                {...register("phoneNumber", 
                                { required: {value:true, message:"Please Enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength: {value:10, message:"Invalid Phone Number"}
                                })}
                            />
                        </div>
                    </div>
                    
                    {
                        errors.phonenumber && (
                            <span>
                                {errors.phonenumber.message}
                            </span>
                
                        )
                    }

                </div>

                {/* message box  */}
                <div className='flex flex-col gap-[6px]' >
                    <label className=' text-richblack-5 w-[94px] h-[22px] text-[14px] leading-[22px] 
                         font-medium'
                         htmlFor="message">Email Address</label>
                    <textarea type="message"
                        cols={30}
                        rows={7}
                        id='message'
                        name='message'
                        className=' bg-richblack-800 text-[16px]  font-medium rounded-md p-[12px] shadow-sm shadow-richblack-400 '
                        placeholder='Enter Your Message'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span>Please Enter Your Message</span>
                        )
                    }
                </div>

                <div>
                <button type='submit' className=' p-[12px] text-center leading-[24px] h-[48px] w-[536px] rounded-md bg-yellow-50 text-[16px] font-bold text-black ' >
                        Send Message
                    </button>
                </div>

            </div>

        </form>)
        }
        </div>

        
    )
}

export default ContactUsForm
