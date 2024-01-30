const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const env = require('dotenv')
const userRoute = require('./Routes/userRoute')
const postRoute = require('./Routes/postRoute')
const commentRoute = require('./Routes/commentRoute')
const notificationRoute = require('./Routes/notificationRoute')

const app = express()

env.config()

const port = process.env.PORT || 5000
const mongo_uri = process.env.MONGO_URI

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

//Routes
app.use('/api/user', userRoute)
app.use('/api/post', postRoute)
app.use('/api/comment', commentRoute)
app.use('/api/notification', notificationRoute)

app.listen(port, (req, res)=>{
    console.log("Connected to server successfully")
})

mongoose.connect(mongo_uri).then(()=>{
    console.log("Connected to mongodb successfully")
}).catch((error)=>{
    console.log("Connection to mongodb failed: ",error)
})


