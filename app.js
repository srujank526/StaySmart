const express = require('express')
const UserRouter = require('./routes/userRouter')
const houseRouter = require('./routes/houseRouter')
const globalErrorHandling = require('./controllers/errorController')
const AppError = require('./utils/appError')

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

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandling);



module.exports= app