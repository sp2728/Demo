const Temperature = require('../models/temperature');
var Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.recordTemperature = (req, res, next)=>{
    var tempRecord = Temperature.create({email:req.body.email, temperature:req.body.temperature, recordDateTime:req.body.recordDateTime});
    tempRecord.then((result)=>{
      if(result){
        res.json({ success: true, status: 'Registration Successful!' });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
};

exports.getTempRecords =  (req,res, next)=>{
    Temperature.findAll()
    .then((records)=>{
      res.json({ success: true, status: 'Records Retrieved Successfully!', records: records });
    })
};
