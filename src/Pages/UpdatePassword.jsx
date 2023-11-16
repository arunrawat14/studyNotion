import React, { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegCheckCircle } from 'react-icons/fa';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import {resetPassword} from '../services/operations/authApi'
import { useDispatch } from "react-redux"

export default function UpdatePassword() {

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

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const location  = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

    setFormData((prevData) => ({
      ...prevData,
      [name]: newPassword,
    }));
  }



  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const password = formData.password;
  const confirmPassword = formData.confirmPassword;

 function onSubmiHandler(event) {
    event.preventDefault();
    const token = location.pathname.split("/").at(-1)
    dispatch(resetPassword(password, confirmPassword, token, navigate));
 }

  return (
    <div className='flex w-11/12 mx-auto justify-center items-center'>
      <div className='flex flex-col mx-auto mt-[100px] h-[448px] text-white w-[508px] p-[32px] gap-[16px]'>
        <p className='text-[30px] leading-[38px] text-richblack-5 font-semibold w-[444px] h-[38px]'>
          Choose new password
        </p>
        <p className='text-[18px] leading-[26px] text-richblack-300 font-semibold w-[444px] h-[78px] font-inter'>
          Almost done. Enter your new password and you're all set.
        </p>

        <label className='w-full relative'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
            Password <sup className='text-pink-200'>*</sup>
          </p>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            placeholder='Enter Password'
            value={password}
            onChange={changeHandler}
            required
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />

          <span
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
            ) : (
              <AiOutlineEye fontSize={24} fill='#AFB2BF' />
            )}
          </span>
        </label>

        <label className='w-full relative'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
            Confirm Password <sup className='text-pink-200'>*</sup>
          </p>
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name='confirmPassword'
            placeholder='Enter Confirm Password'
            onChange={changeHandler}
            required
            value={confirmPassword}
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
          <span
            className='absolute right-3 top-[38px] cursor-pointer'
            onClick={() => setshowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />
            ) : (
              <AiOutlineEye fontSize={24} fill='#AFB2BF' />
            )}
          </span>
        </label>

        <div className='flex flex-wrap w-[444px] h-[68px] gap-[12px] '>
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

        <button type='button'  onClick={onSubmiHandler} className='bg-yellow-50 p-[12px] mt-5 rounded-md h-[48px] w-[444px] text-richblack-800'>
          Reset Password
        </button>

        <Link to='/login'>
          <div className='flex gap-1 text-white  items-center'>
            
            <p className='text-[30px]'>
              <IoIosArrowRoundBack />
            </p>
            Back To Login
          </div>
        </Link>
      </div>
    </div>
  );
}
