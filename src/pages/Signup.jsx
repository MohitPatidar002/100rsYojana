import React from 'react'
import Template from '../components/core/Auth/Template'
import signupImg from '../assets/images/signup.gif'

const Signup = () => {
  return (
    <div>
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
