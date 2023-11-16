import React from 'react'
import loginImg from '../assets/Images/login.webp'
import Template from '../components/core/Auth/Template'

export default function Login(props) {
  let setIsLoggedIn = props.setIsLoggedIn
  return (

        <Template
        title="Welcome Back"
        desc1="Build skills for today, tommorow and beyond."
        desc2="Education tp future-proof your career"
        image= {loginImg}
        formtype="login"
        setIsLoggedIn={setIsLoggedIn}
      />
  )
}
