import React from 'react'

import DisplayPicture from '../components/core/ProfilePage/DisplayPicture'
import AdditionDetail from '../components/core/ProfilePage/AdditionDetail'
import PasswordUpdate from '../components/core/ProfilePage/PasswordUpdate'

const ProfilePage = () => {
    
    
  return (
    <div >
      
      <div className='w-11/12 md:w-6/12 mx-auto justify-center mt-10 mb-10 overflow-hidden'>

        <h1 className='text-3xl text-richblack-5 font-semibold mb-10'>My Profile</h1>

        <DisplayPicture/>

        <AdditionDetail/>
        
        <PasswordUpdate/>
        
      </div>
      
    </div>
  )
}

export default ProfilePage
