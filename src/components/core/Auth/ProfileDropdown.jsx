import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscAccount, VscSignOut } from "react-icons/vsc"
import {  useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import ConfirmationModal from "../Common/ConfirmationModal"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  const [confirmationModal, setConfirmationModal] = useState(null)

  if (!user) return null

  return (
    <>
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.name}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] w-[160px]  border-richblack-700 bg-richblack-800"
          ref={ref}
          >
          <Link to="/profile" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <FaCircleUser className="text-lg" />
              Profile
            </div>
          </Link>

          <Link to="/user/paid" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <FaCheckCircle className="text-lg" />
              Paid Member
            </div>
          </Link>

          <Link to="/user/unpaid" onClick={() => setOpen(false)}>
            <div className="flex w-full items-center gap-x-2 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <IoCloseSharp className="text-lg bg-richblack-100 text-black rounded-full" />
              Unpaid Member
            </div>
          </Link>

          {/* <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div> */}

          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-3 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      )}
    </button>

    
    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
