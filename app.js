const express = require('express')
const UserRouter = require('./routes/userRouter')
const houseRouter = require('./routes/houseRouter')

const app = express()
//Middlewares
app.use(express.json())
app.use('/users',UserRouter)
app.use('/house',houseRouter)

app.get('/',(req,res)=>{
    res.status(200).json({
        status:'success',
        message: "Home Page"
    })
})



module.exports= app