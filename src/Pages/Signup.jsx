import React from 'react'
import signUpImg from '../assets/Images/signup.webp'
import Template from '../components/core/Auth/Template'
export default function Signup({setIsLoggedIn}) {
  return (
    <div>

      <Template
        title="Join The millions learning to code with studyNotion for free"
        desc1="Build skills for today, tommorow and beyond."
        desc2="Education tp future-proof your career"
        image={signUpImg}
        formtype="signup"
        setIsLoggedIn={setIsLoggedIn}
      />
      
    </div>
  )
}
