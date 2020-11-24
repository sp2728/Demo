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
      .catch((err) => {
        console.log(err);
      })
  }
  catch (e) { console.log(e); }
};

function calculateTime(hour, min, sec) {
  return hour * 60 * 60 + min * 60 + sec;
}

exports.getTempRecords = (req, res, next) => {

  try {
    let filterData = req.body;
    let today = new Date()

    let currDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
    let day = '';
    let whereCond = {}
    let whereCond2 = {}

    for (let i = 0; i < filterData.length; i++) {

      if (filterData[i].filterBy == 'temperature') {
        if (filterData[i].value == 'Low') {
          whereCond['temperature'] = {
            [Op.lte]: 90
          }
        }
        else if (filterData[i].value == 'Medium') {
          whereCond['temperature'] = { [Op.and]: [{ [Op.between]: [90, 100] }, { [Op.ne]: 90 }] }
        }
        else {
          whereCond['temperature'] = { [Op.gte]: 100 }
        }
      }

      if (filterData[i].filterBy == 'days') {
        if (filterData[i].value == 'today') {
          whereCond['recordDateTime'] = { [Op.between]: [currDate, today] }
        }

        if (filterData[i].value == 'yesterday') {
          let lastDate = new Date(currDate - (1 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]: [lastDate, currDate] }
        }

        if (filterData[i].value == 'past7Days') {
          let lastDate = new Date(currDate - (7 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]: [lastDate, today] }
        }

        if (filterData[i].value == 'month') {
          let lastDate = new Date(currDate - (30 * 24 * 60 * 60 * 1000));
          whereCond['recordDateTime'] = { [Op.between]: [lastDate, today] }
        }

        if (filterData[i].value == 'year') {
          let lastDate = new Date(currDate - (365 * 24 * 60 * 60 * 1000));;
          whereCond['recordDateTime'] = { [Op.between]: [lastDate, today] }
        }
      }

      if (filterData[i].filterBy == 'email') {
        whereCond2['email'] = { [Op.like]: filterData[i].value }
      }

      if (filterData[i].filterBy == 'fromTime') {
        let fromTime = moment(filterData[i].value, 'HH:mm');
        whereCond['recordDateTime'] = { [Op.gte]: fromTime.toDate() }
      }

      if (filterData[i].filterBy == 'endTime') {
        let endTime = moment(filterData[i].value, 'HH:mm').toDate();
        console.log(calculateTime(endTime.getHours(), endTime.getMinutes(), 0));

        whereCond['recordDateTime'] = { [Op.lte]: endTime }
      }

    }

    Temperature.findAll({ where: whereCond, include: [{ model: User, as: 'user', attributes: ['email'], where: whereCond2 }] })
      .then((records) => {
        res.json({ success: true, status: 'Records Retrieved Successfully!', records: records });
      })
      .catch((err) => {
        console.log(err);
      });

  }
  catch (e) { console.log(e); }
};


exports.checkCabinInfo = (req, res, next) => {

  let data1 = {
    "data": [
                {
                   "ID": 1592753848020,
                   "Title": "MRS",
                   "FirstName": "LINDA",
                   "LastName": "JJCMQQGQEY",
                   "DisplayName": "JJCMQQGQEY LINDA",
                   "Cabin":'123',
                   "DateOfBirth":'2020-11-12'

                },
                {
                  "ID": 1592753848045,
                  "Title": "MRS",
                  "FirstName": "LINDA",
                  "LastName": "JJCMQQGQEY",
                  "DisplayName": "JJCMQQGQEY LINDA",
                  "CabinNumber":'123',
                  "DateOfBirth":'2020-11-12'
               }
            ]
}

  let data2 = {
      "data": [
                  {
                     "ID": 1592753848062,
                     "Title": "MRS",
                     "FirstName": "LINDA",
                     "LastName": "JJCMQQGQEY",
                     "DisplayName": "JJCMQQGQEY LINDA",
                     "CabinNumber":'234',
                     "DOB":'2020-11-12'
                  }
              ],
      "additional_info": {
          "accessToken":"3661c77633fd90f8d9422d54d21a4215914042c6"
      }
  }

  try {
    let cabinData = req.body;
    if (cabinData.cabinNumber == 123 && cabinData.dob == '2020-11-12') {
      res.json({ success: true, status: 200, data: data1})
    }
    else if (cabinData.cabinNumber == 234 && cabinData.dob == '2020-11-12') {
      res.json({ success: true, status: 200, data: data2 })
    }
    else {
      res.json({ success: false, status: 'No User Exists' });
    }
  }
  catch (e) {
    console.log(e);
  }
}

exports.guestAuthorization = (req,res, next)=>{
  console.log(req.headers)
  let data1={
    "id": 1592753848020,
    "accessToken": "3a96a54424ea3c81e3897cdc6ba090b6b468e47e",
    "refreshToken": "2df8f0fea5885a6479d3a439f944a6518e923a89",
    "refreshTokenExpiresAt": 1607020567,
    "accessTokenExpiresAt": 1605814567
  }

  let data2 ={
    "id": 1592753848045,
    "accessToken": "3a96a54424ea3c81e3897cdc6ba090b6b468e47e",
    "refreshToken": "2df8f0fea5885a6479d3a439f944a6518e923a89",
    "refreshTokenExpiresAt": 1607020567,
    "accessTokenExpiresAt": 1605814567
  }

  console.log(req.body);
  try {
    if(req.body.id==1592753848020){
      res.json({ success: true, status: 200, data: data1 })
    }
    else{
      res.json({ success: true, status: 200, data: data2 })
    }
  }
  catch (e) {
    console.log(e);
  }

}


exports.getLocationInputs = (req, res, next) => {

  let data = {
    "inputs": [
      {
        "key": "party_size",
        "min_size": 2,
        "max_size": 10
      }
    ]
  }

  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }
}

exports.generateToken = (req, res, next) => {
  console.log(req.body);
  let data = {
    "token": "GHP-0004",
    "queue_line_number": 7,
    "estimated_time": "30mins",
    "issued_on": "2020-11-17 03:00PM"
  }

  if(req.body.partySize){
    data["party_size"]=req.body.partySize
  }

  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }
}

exports.parseQRCode = (req, res, next) => {
  let data = {
    "ship_id": 1001,
    "location_id": 2000
  }
  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }
}

exports.getLocationDetails = (req, res, next) => {

  let data = {
    "getBusinessCenter": {
      "ID": 4,
      "Name": "Deccan 12345",
      "Description": "New desc",
      "CreatedAt": 1604575602,
      "Status": 1,
      "CreatorObj": {
        "DisplayName": "Ship Admin",
        "FirstName": "Ship",
        "LastName": "Admin",
        "__typename": "UsersNew"
      },
      "UpdatorObj": null,
      "__typename": "BusinessCenter"
    }
  }

  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }


}

exports.getCurrentToken = (req, res, next)=>{

  let data= {
    "current_token": "GHP-0004"
  }

  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }
}

exports.getShipLocations = (req, res, next)=>{

  let data= [
    {
      "lft": 54,
      "rgt": 55,
      "level": 1,
      "rootId": 1,
      "id": 69,
      "label": "Deccan 12345",
      "node_type": "bc",
      "parent": "Zeeko Cruises"
    },
    {
      "lft": 56,
      "rgt": 57,
      "level": 1,
      "rootId": 1,
      "id": 70,
      "label": "Deccan 12346",
      "node_type": "bc",
      "parent": "Zeeko Cruises"
    }
  ];

  try {
    res.json({ success: true, status: 200, data: data })
  }
  catch (e) {
    console.log(e);
  }
}

exports.guestLogout = (req, res, next)=>{
  console.log(123);
  try {
    res.json({success: true, status: 200, message: "LOGOUT_SUCCESS" })
  }
  catch (e) {
    console.log(e);
  }
  

}