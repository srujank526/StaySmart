const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const UserRouter = require('./routes/userRouter')
const houseRouter = require('./routes/houseRouter')
const viewRouter = require('./routes/viewRouter')
const globalErrorHandling = require('./controllers/errorController')
const AppError = require('./utils/appError')

const app = express()
//Middlewares
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json()); // Parses JSON data
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cookieParser());

//Routes
app.use('/', viewRouter);
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/house',houseRouter)



app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandling);



module.exports= app