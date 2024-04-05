const express = require('express')

const app = express()

require('dotenv').config()
app.use(express.json())

const PORT = process.env.PORT || 8001
// app.use

const database = require('./config/database')
const authRoute = require('./router/authRouter')
const { data } = require('./data/dummydata')

database()

app.use('/api/v1/auth',authRoute)

app.get('/data',(req,res)=>{
    res.send(data)
  
})

app.get('/row',(req,res)=>{
    res.send("Hi shivam yadav")
})

app.get('/Tanmay',(req,res)=>{
    res.send("Hi Tanmay Dhillo kaisi ho")
})


app.listen(PORT,()=>{
    console.log(`App is listening on port ${PORT}`)
})