const Temperature = require('../models').Temperature;
var Sequelize = require('sequelize');
const User = require('../models').User;
const status = require('http-status-codes');
const moment = require('moment');

const Op = Sequelize.Op

exports.recordTemperature = (req, res, next) => {
  try {
    User.findOne({ where: { id: req.body.userId } })
      .then((user) => {
        if (user) {
          var tempRecord = Temperature.create({ userId: req.body.userId, temperature: req.body.temperature, recordDateTime: req.body.recordDateTime });
          tempRecord.then((result) => {
            if (result) {
              // res.status(status.OK).send({success: true, message:'Registration Successful!'})
              res.json({ success: true, status: 'Registration Successful!' });

            }
          })
            .catch((err) => {
              console.log(err);
            })
        }
        else {
          res.json({ success: false, status: 'Incorrect Email' });
        }
      })
      .catch((err)=>{
        console.log(err);
      })
  }
  catch (e) { console.log(e); }
};

function calculateTime(hour,min, sec){
  return hour*60*60 +min*60 + sec;
}

exports.getTempRecords = (req, res, next) => {

  try {
    let filterData = req.body;
    let today= new Date()

    let currDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let day='';
    let whereCond = {}
    let whereCond2 = {}

    for(let i=0; i<filterData.length; i++){

      if(filterData[i].filterBy =='temperature'){
        if (filterData[i].value == 'Low') {
          whereCond['temperature'] = {
            [Op.lte]: 90
          }
        }
        else if (filterData[i].value == 'Medium') {
          whereCond['temperature'] = { [Op.and]: [ { [Op.between]: [90, 100] }, { [Op.ne]: 90 } ] }
        }
        else {
          whereCond['temperature'] = { [Op.gte]: 100 }
        }
      }

      if(filterData[i].filterBy =='days'){
        if(filterData[i].value =='today'){
          whereCond['recordDateTime'] = { [Op.between]:[currDate, today] }
        }
    
        if( filterData[i].value =='yesterday'){
          let lastDate = new Date(currDate - (1 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]:[lastDate, currDate] }
        }
    
        if(filterData[i].value =='past7Days'){
          let lastDate = new Date(currDate - (7 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]:[lastDate, today] }
        }
    
        if(filterData[i].value =='month'){
          let lastDate = new Date(currDate - (30 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]:[lastDate, today] }
        }
    
        if(filterData[i].value =='year'){
          let lastDate = new Date(currDate - (365 * 24 * 60 * 60 * 1000));;
          whereCond['recordDateTime'] = { [Op.between]:[lastDate, today] }
        }
      }

      if(filterData[i].filterBy =='email'){
        whereCond2['email']={ [Op.like]:filterData[i].value }
      }

      if(filterData[i].filterBy=='fromTime'){
        let fromTime = moment(filterData[i].value, 'HH:mm');
        whereCond['recordDateTime']= { [Op.gte]:fromTime.toDate()}
      }

      if(filterData[i].filterBy=='endTime'){
        let endTime = moment(filterData[i].value, 'HH:mm').toDate();
        console.log(calculateTime(endTime.getHours(), endTime.getMinutes(),0));
        
        whereCond['recordDateTime']= { [Op.lte]:endTime}
      }

    }

    Temperature.findAll({ where: whereCond, include:[{model: User,as:'user', attributes: ['email'], where:whereCond2 }]})
      .then((records) => {
        res.json({ success: true, status: 'Records Retrieved Successfully!', records: records });
      })
      .catch((err)=>{
        console.log(err);
      });

  }
  catch (e) { console.log(e); }
};



