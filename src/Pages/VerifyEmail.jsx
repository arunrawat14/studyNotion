import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import { MdOutlineRestore } from "react-icons/md";
import OtpInput from 'react-otp-input';
import { signup } from '../services/operations/authApi'
import {sendOtp} from '../services/operations/authApi'

const VerifyEmail = () => {

    const { signupData, loading } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, [navigate, signupData])

    function handleOtpSignup(event) {
        event.preventDefault()
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData

        console.log(signupData)

        dispatch(signup(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ))
    }

    function resendmail(event) {
        event.preventDefault();
        const {email} = signupData;
        dispatch(sendOtp(email,navigate))
    }

    return (
        <div>
            {
                loading ? (
                    <div>
                        Loading...
                    </div>

                ) : (<div>

                    <div className='flex flex-col mx-auto mt-[150px] h-[448px] text-white w-[508px] p-[32px] gap-[16px]'>
                        <p className='text-[30px] leading-[38px] text-richblack-5 font-semibold w-[444px] h-[38px]'>
                            Verify email
                        </p>
                        <p className='text-[18px] leading-[26px] text-richblack-200 font-semibold  w-[444px] h-[78px] font-inter'>
                            A verification code has been sent to you. Enter the code below
                        </p>

                        <form onSubmit={handleOtpSignup} >
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                            >
                                Verify Email
                            </button>
                        </form>

                        <div className='flex justify-between p-1 '>
                            <Link to='/login'>
                                <div className='flex gap-1 text-white  items-center'>
                                    <p className='text-[30px]'>
                                        <IoIosArrowRoundBack />
                                    </p>
                                    Back To Login
                                </div>
                            </Link>

                            <button onClick={resendmail} >
                                <div className='flex gap-1 text-blue-200 items-center'>
                                    <p className='text-[30px]'>
                                        < MdOutlineRestore />
                                    </p>
                                    Resend it
                                </div>
                            </button>

                        </div>

                    </div>
                </div>)
            }

        </div>
    )
}

export default VerifyEmail
