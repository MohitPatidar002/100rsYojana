import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImg from '../assets/images/signup.gif'

const Signup = () => {
  return (
    <div className='flex justify-center items-center w-[100%] h-[calc(100vh-3.5rem)]'>
      <Template
      title="Signup Here"
      desc1=""
      desc2=""
      image={signupImg}
      formtype="signup"
      
    />
    </div>
  )
}

export default Signup
