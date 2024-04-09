import React from 'react'
// import logo from '../../../assets/images/logo4.png'
import logo from '../../../assets/images/100रु वाली योजना.png'
import { Link, matchPath, useNavigate } from 'react-router-dom'
import { NavbarLinks } from '../../../data/NavbarLinks'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../services/operations/authAPI'
import '../../../App.css'
import ProfileDropdown from '../Auth/ProfileDropdown'

const Navbar = () => {

   
    const {token} = useSelector( (state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname)
    }


  return (
    <div className='h-14 border-b-[1px] bg-richblack-900 border-richblack-700 items-center justify-center'>
      <div className='flex w-11/12 items-center justify-between mx-auto h-full'>
        
        <div >
            <Link to="/home">
                <img src={logo} width={75} height={60} />
            </Link>
        </div>
        
        

        <nav>
            <ul className='hidden md:flex flex-row gap-x-6 items-center justify-center'>
                {
                    NavbarLinks.map( (link, index) => (
                        <div key={index}>
                            <li  >
                                <Link to={link.path}>
                                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : 
                                    "text-richblack-100"}`}>
                                        {link.title}
                                    </p>
                                </Link>
                            </li>
                        </div>
                    ))
                }
            </ul>
        </nav>
        

        {/* login/signup/logout */}
        <div className='flex gap-x-3 items-center'>
            {
                token === null && (
                    <Link to="/login">
                        <button className='border border-richblack-700 text-richblack-100 px-[12px] py-[8px] rounded-md'>
                            Log in
                        </button>
                    </Link>
                )
            }

            {
                token === null && (
                    <Link to="/signup">
                        <button className='border border-richblack-700 text-richblack-100 
                        px-[12px] py-[8px] rounded-md'>
                            Sign Up
                        </button>
                    </Link>
                )
            }

            {
                token !== null && <ProfileDropdown/>
                
            }

        </div>
        
      </div>
    </div>
  )
}

export default Navbar
