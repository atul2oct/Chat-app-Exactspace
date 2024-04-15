const express = require('express')
const chats = require('./data/data')
const app = express()

const db = require('./config/database')

require('dotenv').config()
const PORT = process.env.PORT || 4000
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const {cloudinaryConnect} = require('./config/cloudinary')


app.use(express.json())
app.use(
    cors({//deep dive why credentials:true ?
        origin: "http://localhost:3000",
        credentials:true,            //access-control-allow-credentials:true
    })
)

app.use('/api/user',userRoutes)

// cloudinary Connection
cloudinaryConnect()

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
