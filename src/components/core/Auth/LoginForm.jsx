import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import {login} from '../../../services/operations/authApi'
import { useDispatch } from 'react-redux';

export default function LoginForm() {
    
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const [showPassword, setShowPassword] = useState(true);
  const {email, password} = formData;

  function changeHandler(event) {
    setFormData((prevdata) => ({
      ...prevdata,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault()
    dispatch(login(email, password, navigate))
  }
  
  return (
    <div>
      <form onSubmit={submitHandler}
       className="flex flex-col w-full gap-y-4 mt-6">
        <label className='w-full' >
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'
          >Email Address <sup className='text-pink-200' >*</sup></p>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email id"
            onChange={changeHandler}
            required
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />
        </label>

        <label className='w-full relative' >
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]' 
          >Password <sup className='text-pink-200' >*</sup></p>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            placeholder="Enter Password"
            onChange={changeHandler}
            required
            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
          />

          <span  className='absolute right-3 top-[38px] cursor-pointer' onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />}
          </span>

        </label>

        <Link to="/Reset-password">
          <p className='text-xs mt-1 text-blue-100 max-w-max ml-auto' >Forgot Password</p>
        </Link>

        <button className='bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6' >Sign in</button>
      </form>
    </div>
  );
}
