const User = require('../models/userModel')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  };

  exports.protect = catchAsync(async (req, res, next) => {
    // 1) Get the token from the headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
  
    // 2) Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(new AppError('The user belonging to this token no longer exists.', 401));
    }
  
    // 4) Grant access to the route and set user on req obj
    req.user = currentUser;
    next();
  });

  exports.restrictTo = (roles) => {
    return (req, res, next) => {
      // roles ['admin', 'user']. role='user'
      if (!roles.includes(req.user.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
  
      next();
    };
  };

exports.login = catchAsync(async(req,res,next)=>{
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
  
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Incorrect email or password', 401));
    }
  
    // 3) If everything ok, send token to client
    const token = signToken(user._id);

    // set token in a cookie
    res.cookie('jwt', token, {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      httpOnly: true,
  });

    user.password = undefined
    res.status(200).json({
      status: 'success',
      token,
      data: user
    });
})


exports.signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signToken(newUser._id);
 
  // Remove password from output
  newUser.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
        newUser
    }
  });
  });

  exports.isLoggedIn = async (req, res, next) => {
    if (req?.cookies?.jwt) {
      try {
        // 1) verify token
        const decoded = await promisify(jwt.verify)(
          req.cookies.jwt,
          process.env.JWT_SECRET
        );

        // 2) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
          return next();
        }
  
        // THERE IS A LOGGED IN USER
        res.locals.user = currentUser;
        return next();
      } catch (err) {
        return next();
      }
    }
    next();
  };