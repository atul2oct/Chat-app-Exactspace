import React from 'react'
import { useSelector } from 'react-redux'
import ProfileDropDown from '../components/Auth/ProfileDropDown'
import { useParams } from 'react-router-dom'

const HomePage = () => {

  const {token} = useSelector(state=>state.auth)
  const {catalogName} = useParams()
  console.log("params",catalogName)
  return (
    <div className='w-full h-full mx-auto text-center'>
      {
        token !== null && <ProfileDropDown/>
      }
    </div>
  )
}

export default HomePage