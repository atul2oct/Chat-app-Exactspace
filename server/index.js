const express = require('express')
const chats = require('./data/data')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000

app.get('/api/chats',(req,res)=>{
    res.send(chats)
})
app.get('/api/chats/:id',(req,res)=>{
    const chat = chats.find(chat=>chat._id === req.params.id)
    res.send(chat)
})

app.listen(PORT,()=>{
    console.log(`App is running at port no.: ${PORT}`)
})
