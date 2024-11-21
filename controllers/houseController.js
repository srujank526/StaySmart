const House = require('../models/houseModel')
const catchAsync = require('../utils/catchAsync')

const getAllHouses = catchAsync(async(req,res)=>{
        const houses = await House.find().populate('userId', 'name email');
        res.status(200).json({
            status:'success',
            results: houses.length,
            data: houses
        })
})

const getHouseById = catchAsync(async(req,res)=>{
        const house = await House.findById(req.params.id).populate('userId', 'name email');
        if (!house) {
          return next(new AppError('No house found with that ID', 404));
        }
        res.status(200).json({ success: true, data: house });
})

const addHouse = catchAsync(async(req,res)=>{
    const { userId = req.user._id, title,address, rentAmount, description,isAvailable } = req.body;
    const newHouse = new House({
        userId,
        title,
        address,
        rentAmount,
        description,
        isAvailable    
    });

    await newHouse.save()
    res.status(201).json({
        status:'success',
        data: newHouse
        })
})

const deleteHouse = catchAsync(async (req, res, next) => {
    const house = await House.findById(req.params.id);

    if (!house) {
        return next(new AppError('No house found with that ID', 404));
    }

    // Check if the user is the owner of the house
    if (house.userId._id.toString() !== req.user.id) {
        return next(new AppError('You are not authorized to delete this house', 403));
    }

    await House.deleteOne({ _id: req.params.id });

    res.status(204).json({
        status: 'success',
        data: null
    });
});
module.exports = {getAllHouses,getHouseById,addHouse,deleteHouse}