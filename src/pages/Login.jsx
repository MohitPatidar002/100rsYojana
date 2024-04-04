import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/images/login.png'


const Login = () => {


  return (
    <div className='flex justify-center items-center w-[100%] h-[calc(100vh-3.5rem)]'>  
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
