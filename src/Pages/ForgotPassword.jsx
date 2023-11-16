import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { getPasswordResetToken } from '../services/operations/authApi';
import { useDispatch } from 'react-redux';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

  function onsubbmitHandler() {
    // No need for event.preventDefault() if event is not used
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

  return (
    <div className='flex w-11/12 mx-auto justify-center items-center'>
      {!emailSent ? (
        <div className='flex flex-col mx-auto mt-[150px] h-[448px] text-white w-[508px] p-[32px] gap-[26px]'>
          <p className='text-[30px] leading-[38px] text-richblack-5 font-semibold w-[444px] h-[38px]'>
            Reset your password
          </p>
          <p className='text-[18px] leading-[26px] text-richblack-300 font-semibold w-[444px] h-[78px] font-inter'>
            Have no fear. We’ll email you instructions to reset your password. If you don't have access to your email, we can try account recovery.
          </p>

          <label className='flex flex-col gap-[10px]w-[444px] h-[76px]'>
            <div className='flex'>
              <p>Email Address </p>
              <p className=' text-pink-400'>*</p>{' '}
            </div>
            <input
              type='email'
              value={email}
              placeholder='Enter Your Email Address'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className='bg-richblack-800 p-[12px] rounded-md h-[48px] w-[444px] shadow-sm shadow-richblack-300'
            />
          </label>

          <button type='button' onClick={onsubbmitHandler} className='bg-yellow-50 p-[12px] rounded-md h-[48px] w-[444px] text-richblack-800'>
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
      ) : (
        <div className='flex flex-col mx-auto mt-[200px] text-white w-[508px] p-[32px] gap-[36px]'>
          <p className='text-[30px] leading-[38px] text-richblack-5 font-semibold w-[444px] h-[38px]'>Check email</p>
          <p className='text-[18px] leading-[26px] text-richblack-300 font-semibold w-[444px] h-[58px] font-inter'>{`We have sent the reset email to ${email}`}</p>

          <button onClick={onsubbmitHandler} className='bg-yellow-50 p-[12px] rounded-md h-[48px] w-[444px] text-richblack-800'>
            Resend Email
          </button>
          <Link to='/login'>
            <p className='flex gap-1 text-white  items-center'>
              {' '}
              <p className='text-[30px]'>
                <IoIosArrowRoundBack />
              </p>{' '}
              Back To Login{' '}
            </p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
