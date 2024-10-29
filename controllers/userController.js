const User = require('../models/userModel')

const getAllUsers = async(req,res)=>{
    try{
        const users = await User.find()
        res.status(200).json({
            status:'success',
            data: users
        })
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}
const getUserById = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id).select(['-password','-__v']);
    
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        res.status(200).json({
          success: true,
          data: user
        });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
}
const createUser = async(req,res)=>{
    try{

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
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}
module.exports = {getAllUsers,getUserById,createUser}