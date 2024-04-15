import React, { useState } from 'react'
import SignupForm from '../components/Auth/SignupForm'
import LoginForm from '../components/Auth/LoginForm'
import image from '../assets/Auth.png'
import AuthChanger from '../components/Auth/AuthChanger'

const AuthPage = () => {
    const [loading,setLoading] = useState(false)
    const [authType,setAuthType] = useState('Login')

    const authData = [
        {
          id:1,
          authName:'Login',
        },
        {
          id:2,
          authName:'Signup',
        },
      ]

  return (
    <>
        {
            loading ? (<div className="spinner"></div>)
            : (
                <div className='flex md:flex-row md:gap-y-0 md:gap-x-12 flex-col-reverse
                gap-y-12 py-12 justify-between w-11/12 max-w-maxContent mx-auto
                items-center min-h-[calc(100vh-3.5rem)]'>

                    {/* left */}
                    <div className='mx-auto max-w-[450px] w-11/12 md:mx-0'>
                        <h1 className='text-richblack-5 text-3xl font-semibold'>
                            {
                                authType === 'Login' ? "Welcome Back" : "Join the millions learning to code with StudyNotion for free"
                            }
                        </h1>
                        <p className='text-lg mt-4'>
                            <span className='text-richblack-100'>
                                Use this Chat Application
                            </span>{" "}
                            <span className='text-blue-100 font-edu-sa font-bold italic'>
                                This is only for Education purpose.
                            </span>
                        </p>
                        <AuthChanger authData={authData} field={authType} setField={setAuthType}/>
                        {authType === 'Login' ? <LoginForm/> : <SignupForm/>}
                    </div>

                    {/* right */}
                    <div className='mx-auto max-w-[450px] md:mx-0'>
                        <img
                            src={image}
                            alt='pattern'
                            width={558}
                            height={504}
                            loading='lazy'
                        />
                    </div>
                </div>
            )
        }
    </>
  )
}

export default AuthPage