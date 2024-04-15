import toast from "react-hot-toast";
import { apiConnector } from "./apiConnector";
import { endpoints } from "./api";

const {
    DATA_API,
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
