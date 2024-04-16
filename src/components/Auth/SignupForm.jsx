import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { signup } from '../../services/operation'

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""
  })
  const [showPassword,setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  // const [image, setImage] = useState(null);

  // const handleImageChange = (e) => {
  //   console.log(e.target.files)
  //   const file = e.target.files[0];
  //   if(file){
  //     setImage(file);
  //   }
  // };

  const {firstName, lastName, email, password, confirmPassword} = formData

  function changeHandler(event){
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    if(password !== confirmPassword){
      toast.error('Password mismatch')
      return
    }

    // console.log("image",image)
    // const formData = new FormData();
    // formData.append('image', image);
    // console.log("image",formData.image)
    
    // console.log("Signup data:",firstName, lastName, email, password, image)
    
    dispatch(signup(firstName, lastName, email, password, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    // setImage(null)

  }

  return (
    <form onSubmit={handleOnSubmit} className='w-full max-w-max flex flex-col gap-y-4 mt-6'>

      {/* name */}
      <div className='flex gap-x-4'>
          <label>
            <p className='text-richblack-5 text-sm mb-1'>First Name<sup className='text-pink-200'>*</sup></p>
            <input
              type='text'
              placeholder='Enter first name'
              name='firstName'
              value={firstName}
              onChange={changeHandler}
              className='form-style w-full'
            />
          </label>
          <label>
            <p className='text-richblack-5 text-sm mb-1'>Last Name<sup className='text-pink-200'>*</sup></p>
            <input
              type='text'
              placeholder='Enter last name'
              name='lastName'
              value={lastName}
              onChange={changeHandler}
              className='form-style w-full'
            />
          </label>
        </div>
      
      {/* email */}
      <label className='flex flex-col'>
        <p className='text-richblack-5 mb-1 text-sm'>
          Email Address<sup className='text-pink-200'>*</sup>
        </p>
        <input
          type='text'
          placeholder='Enter email address'
          name="email"
          value={email}
          onChange={changeHandler}
          className='form-style'
        />
      </label>

      {/* password and confirm passord */}
      <div className='flex gap-x-4'>
        {/* password */}
        <label className='relative'>
          <p className='text-richblack-5 mb-1 text-sm'>
          Password<sup className='text-pink-200'>*</sup>
          </p>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name="password"
            value={password}
            onChange={changeHandler}
            className='form-style'
          />
          <span onClick={() => setShowPassword(prev => !prev)} className='absolute cursor-pointer top-9 right-3'>
            {
              showPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            }
          </span>
        </label>

        {/* confirm password */}
        <label className='relative'>
          <p className='text-richblack-5 mb-1 text-sm'>
            Confirm Password<sup className='text-pink-200'>*</sup>
          </p>
          <input
          type={showConfirmPassword ? 'text' : 'password'}
            placeholder='Enter Password'
            name="confirmPassword"
            value={confirmPassword}
            onChange={changeHandler}
            className='form-style'
          />
          <span onClick={() => setShowConfirmPassword(prev => !prev)}
          className='absolute cursor-pointer right-3 top-9'>
            {
              showConfirmPassword ? <AiOutlineEye fontSize={24} fill="#AFB2BF" /> : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            }
          </span>
        </label>
      </div>
      
      <button className='bg-yellow-50 rounded-lg py-2 mt-6 px-3 font-medium text-richblack-900' type='submit'>
        Create Account
      </button>

    </form>
  )
}

export default SignupForm