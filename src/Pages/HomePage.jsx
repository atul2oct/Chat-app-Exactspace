import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../components/Auth/ProfileDropDown'

const HomePage = () => {

  const {token} = useSelector(state=>state.auth)
  return (
    <div className='w-full h-full mx-auto text-center'>
      {
        token !== null && <ProfileDropDown/>
      }
    </div>
  )
}

export default HomePage