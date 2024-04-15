import React, { useEffect, useState } from 'react'
import { apiConnector } from '../services/apiConnector'
import { fetchAllChatsData } from '../services/operation'
const BASE_URL = process.env.REACT_APP_BASE_URL
const ChatPage = () => {
    const [chats,setChats] = useState([])
    
    useEffect(()=>{

        const fetchChats = async()=>{
            const data = await fetchAllChatsData()
            console.log(data)
            setChats(data)
        }

        fetchChats()

    },[])
  return (
    <div>
        {
            chats.map((chat,index)=>(
                <div key={index}>{chat.chatName}</div>
            ))
        }
    </div>
  )
}

export default ChatPage