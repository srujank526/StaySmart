const User = require('../models/userModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require('../utils/appError')

const getAllUsers = catchAsync(async(req,res)=>{
        const users = await User.find()
        res.status(200).json({
            status:'success',
            results: users.length,
            data: users
        }) 
})
const getUserById = catchAsync(async(req,res,next)=>{
    const user = await User.findById(req.params.id).select(['-password','-__v']);
    if(!user) return next(new AppError('No user found',404))
    res.status(200).json({
        success: true,
        results: 1,
        data: user
    });
})
const createUser = catchAsync(async(req,res)=>{
        const newUser = new User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            role : req.body.role
        })
    
        await newUser.save()
        res.status(201).json({
            status:'success',
            data: newUser
        })
        res.status(400).json({ success: false, message: err.message });
})
module.exports = {getAllUsers,getUserById,createUser}