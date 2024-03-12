import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/images/login.png'

const Login = () => {
  return (
    <div>
      <Template 
        title="Welcome Back"
        desc1=""
        desc2=""
        image={loginImg}
        formtype="login"
        
      />
    </div>
  )
}

export default Login
