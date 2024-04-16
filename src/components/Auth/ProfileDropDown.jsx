import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscSignOut } from "react-icons/vsc"
import { logout } from '../../services/operation'
import useOnClickOutside from '../../hooks/useOnClickOutside'

const ProfileDropDown = () => {
    const { user } = useSelector((state)=>state.profile)
    console.log("user",user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const [open,setOpen] = useState(false)

    const ref = useRef()

    useOnClickOutside(ref,()=>setOpen(false))
  return (
    <button className='relative top-0 right-0 py-10' onClick={()=>setOpen(!open)}>
      <div className='flex items-center gap-x-1'>
        <img src={user?.pic} className='aspect-square rounded-full w-8 object-cover'
          alt={`profile-${user?.firstName}`}
        />
        <AiOutlineCaretDown className='text-sm text-richblack-100'/>
      </div>
      {
        open && (
          <div className='absolute overflow-hidden rounded-sm border-y-[1px] border-richblack-700 bg-richblack-800 top-[70%] right-0 z-[1000]'
            onClick={(e) => e.stopPropagation()} ref={ref}
          >
            <div onClick={()=>{
              setOpen(false)
              dispatch(logout(navigate))
            }} className='flex w-full items-center gap-x-1 py-[10px] px-3 text-sm
              text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
              <VscSignOut className='text-lg'/>
              Logout
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown