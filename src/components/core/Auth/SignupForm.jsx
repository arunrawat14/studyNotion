import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { FaRegCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import sendotp for sending otp 

import { sendOtp } from '../../../services/operations/authApi';

// import set signup data to set the signup data to store in db after otp sent
import {setSignupData} from '../../../sclices/authSclice'
import { ACCOUNT_TYPE } from '../../../utils/constants';


const SignupForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const validpass = [
        {
          id: 1,
          name: 'one lowercase character',
        },
        {
          id: 2,
          name: 'one special character',
        },
        {
          id: 3,
          name: 'one uppercase character',
        },
        {
          id: 4,
          name: '8 character minimum',
        },
        {
          id: 5,
          name: 'one number',
        },
      ];

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [lowCase, setLowCase] = useState(false);
    const [upperCase, setUpperCase] = useState(false);
    const [character, setCharacter] = useState(false);
    const [number, setNumber] = useState(false);
    const [length, setLength] = useState(false);

    function changeHandler(event) {

        const newPassword = event.target.value;
        const name = event.target.name;

    // Check conditions based on the input field (password or confirmPassword)
    switch (name) {

      case 'password':
        // Check conditions for the password
        setLowCase(/[a-z]/.test(newPassword));
        setUpperCase(/[A-Z]/.test(newPassword));
        setCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(newPassword));
        setNumber(/\d/.test(newPassword));
        setLength(newPassword.length >= 8);
        break;
      case 'confirmPassword':
        // You can add additional conditions for the confirmPassword if needed
        break;
      default:
        break;
    }

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    const {firstName, lastName, email, password, confirmPassword } = formData

    function submitHandler(event) {
        event.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
            return ;
        }

        const signupData = {
            ...formData,
            accountType,
        }

        // setting signup data to state 
        // to be used after otp verification 
        dispatch(setSignupData(signupData))
        // sent otp to uder for verification 
        dispatch(sendOtp(email, navigate))

        // Reset
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      
      setAccountType(ACCOUNT_TYPE.STUDENT)

      setLowCase(false)
      setUpperCase(false)
      setCharacter(false)
      setLength(false)
      setNumber(false)
        

    }

  return (
    <div className='flex flex-col justify-center  w-11/12 ' >
        {/* student-Instructor tab */}
        <div
        className='flex bg-richblack-800 p-1 gap-x-1 my-2 rounded-full max-w-max'>

            <button
            className={`${accountType ===  ACCOUNT_TYPE.STUDENT
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={()=> setAccountType(ACCOUNT_TYPE.STUDENT)}>
                Student
            </button>

            <button
            className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR 
            ?
              "bg-richblack-900 text-richblack-5"
            :"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
            onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>
                Instructor
            </button>
        </div>

        <form onSubmit={submitHandler} className='flex flex-col' >
        {/* first name and lastName */}
            <div className='flex gap-x-4 mt-[10px]'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.1rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={firstName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.1rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px]'
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.1rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={email}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px]'
                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password */}
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.1rem]'>Create Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px]'
                    />
                    <span
                     className='absolute right-3 top-[30px] cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.1rem]'>Confirm Password<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[8px]'
                    />
                    <span 
                     className='absolute right-3 top-[30px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>

            <div className='flex flex-wrap w-[444px] mt-4 mb-4 h-[68px] gap-[12px] '>
          {validpass.map((value, index) => {
            return (
              <div
                className={`flex w-[168px] h-[20px] gap-[6px] items-center ${
                  (lowCase && value.name === 'one lowercase character') ||
                  (upperCase && value.name === 'one uppercase character') ||
                  (character && value.name === 'one special character') ||
                  (number && value.name === 'one number') ||
                  (number && value.name === 'one number') ||
                  (length && value.name === '8 character minimum')
                    ? ' text-caribbeangreen-400'
                    : 'text-pink-600'
                } `}
                key={index}
              >
                <p className='h-[13px] w-[13px]'>
                  <FaRegCheckCircle />
                </p>
                <p className={`w-[144px] h-[20px] text-[12px] font-inter leading-[20px] `}>
                  {value.name}
                </p>
              </div>
            );
          })}
        </div>

        <button className=' w-full bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[4px] mt-6'>
            Create Account
        </button>
        </form>

    </div>
  )
}

export default SignupForm
