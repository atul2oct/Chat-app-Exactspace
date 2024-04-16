import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./api";
import { setLoading, setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";

const {
    DATA_API,
    LOGIN_API,
    SIGNUP_API,
    GETALLUSER_API
} = endpoints

export const fetchAllChatsData = async() => {
    const toastId = toast.loading('Loading...')
    let result = []
    try{
        const response = await apiConnector('GET',DATA_API)
        // if(!response?.data?.success){
        //     throw new Error("Could not fetch Chats data",response)
        // }
        result = response.data
    }catch(error){
        console.log("All Chats Data fetching API Error",error)
        toast.error(error.message)
        result = error.response?.data;
    }
    toast.dismiss(toastId)
    return result;
}

export function login(email, password, navigate) {
    return async(dispatch) => {
        const toastId = toast.loading('Loading...')
        dispatch(setLoading(true))
        let result = []
        try{
            const response = await apiConnector('POST', LOGIN_API, {
                email,
                password,
            })
            if(!response?.data?.success){
                throw new Error("LOGIN API RESPONSE......",response)
            }
            console.log('res',response)

            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.data))

            localStorage.setItem('token',JSON.stringify(response.data.token))
            localStorage.setItem('user',JSON.stringify(response.data.data))

            result = response.data
            toast.success('Login Successfully')
            navigate("/chats")
        }catch(error){
            console.log("All Chats Data fetching API Error",error)
            toast.error(error.message)
            result = error.response?.data;
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result;
    }    
}

export function signup(
    firstName,
    lastName,
    email,
    password,
    formData,
    navigate
) {
    return async(dispatch) => {
        const toastId = toast.loading('Loading...')
        dispatch(setLoading(true))
        let result = []
        try{
            const response = await apiConnector('POST', SIGNUP_API,
                {
                    firstName,
                    lastName,
                    email,
                    password,
                },
            )
            
            if(!response?.data?.success){
                throw new Error("LOGIN API RESPONSE......",response)
            }
            
            console.log('res',response)

            // dispatch(setToken(response.data.token))
            // dispatch(setUser(response.data.data))

            // localStorage.setItem('token',JSON.stringify(response.data.token))
            // localStorage.setItem('user',JSON.stringify(response.data.data))
            
            result = response.data
            toast.success('Sign up Successfully')
            // navigate("/")

        }catch(error){
            console.log("API Error in Sign up",error)
            toast.error(error.message)
            result = error.response?.data;
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
        return result;
    }    
}

export function logout(navigate) {
    return async(dispatch) => {       

        dispatch(setToken(null))
        dispatch(setUser(null))

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        
        toast.success('Logged Out')
        navigate("/auth")
        
    }    
}

export const getAllUsers = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")

    try{
        const response = await apiConnector("get", GETALLUSER_API, {
            Authorization: `Bearer ${token}`,
          }, params
        )
          console.log("CREATE COURSE API RESPONSE............", response)
          if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details",response.data.message)
          }
          toast.success("Course Details Added Successfully")
          result = response?.data?.data
    }catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
      }
    toast.dismiss(toastId)
    return result
}