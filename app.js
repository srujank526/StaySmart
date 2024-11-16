const express = require('express')
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
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

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
app.use('/api', limiter);

// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

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