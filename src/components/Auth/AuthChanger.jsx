import React from 'react'

const AuthChanger = ({authData, field, setField}) => {
  return (
    <div className='bg-richblack-800 max-w-max rounded-full flex p-1 my-6 gap-x-1'>
        {
            authData.map((auth)=>(
                <button key={auth.id} onClick={()=>setField(auth.authName)}
                    className={`${field === auth.authName ? "bg-richblack-900 text-richblack-5":"bg-transparent text-richblack-200"} py-2 px-5 rounded-full transition-all duration-200`}
                >
                    {auth.authName}
                </button>
            ))
        }
    </div>
  )
}

export default AuthChanger