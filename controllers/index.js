const Temperature = require('../models/temperature');
const User = require('../models/users');
var Sequelize = require('sequelize');
const { Model } = require('sequelize');
const Op = Sequelize.Op

exports.recordTemperature = (req, res, next)=>{
  User.findOne({where:{id:req.body.userId}})
  .then((user)=>{
    if(user){
      var tempRecord = Temperature.create({userId:req.body.userId, temperature:req.body.temperature, recordDateTime:req.body.recordDateTime});
      tempRecord.then((result)=>{
        if(result){
          res.json({ success: true, status: 'Registration Successful!' });
        }
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    else{
      res.json({ success: false, status: 'Incorrect Email' });
    }
  })
};

exports.getTempRecords = async (req,res, next)=>{
    try{
    let whereCond ={}
    if(req.body.fromDate && req.body.toDate){
      whereCond['recordDateTime']={
        [Op.between]:[ new Date(req.body.fromDate), new Date(req.body.toDate)]
      }
    }
    
    if(req.body.fromDate && !req.body.toDate){
      whereCond['recordDateTime']={
        [Op.gte]: new Date(req.body.fromDate)
      }
    }

    if(!req.body.fromDate && req.body.toDate){
      whereCond['recordDateTime']={
        [Op.lte]: new Date(req.body.toDate)
      }
    }

    if(req.body.temperature){
      if(req.body.temperature=='Low'){
        whereCond['temperature']= {
          [Op.lte]:90
        }
      }
      else if(req.body.temperature=='Medium'){
        whereCond['temperature']= {
          [Op.between]:[90,100]
        }
      }
      else{
        whereCond['temperature']= {
          [Op.gte]:100
        }
      }
    }
    await Temperature.findAll({where:whereCond, include:User     })
    .then((records)=>{
      // console.log(records);
      res.json({ success: true, status: 'Records Retrieved Successfully!', records: records });
    });
  }
  catch(e){
    console.log(e);
  }
    // User.findAll({raw:true, include:Temperature})
    // .then((rec)=>{
    //   console.log(rec)
    // })

    User.findAll({include: Temperature})
    .then((res)=>{
      console.log(res);
    })
};
