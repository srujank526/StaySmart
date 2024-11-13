const catchAsync = require('../utils/catchAsync')
const House = require('../models/houseModel')

exports.getOverview = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const houses = await House.find();
  
    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
      title: 'All Houses',
      houses
    });
  });

  exports.getLoginForm = (req, res) => {
    res.status(200).render('login', {
      title: 'Log into your account'
    });
  };