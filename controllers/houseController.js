const House = require('../models/houseModel')

const getAllHouses = async(req,res)=>{
    try{
        const houses = await House.find()
        res.status(200).json({
            status:'success',
            data: houses
        })
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}
const getHouseById = async(req,res)=>{
    try {
        const house = await House.findById(req.params.id).populate('user');
        if (!house) {
          return res.status(404).json({ success: false, message: 'House not found' });
        }
        res.status(200).json({ success: true, data: house });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
}
const addHouse = async(req,res)=>{
    try{
        const { user, title,address, rentAmount, description,isAvailable } = req.body;

        const newHouse = new House({
            user,
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
    }catch(err){
        res.status(400).json({ success: false, message: err.message });
    }
}
const deleteHouse = (req,res)=>{
    res.status(201).json({
        status:'success',
        data: []
    })
}
module.exports = {getAllHouses,getHouseById,addHouse,deleteHouse}