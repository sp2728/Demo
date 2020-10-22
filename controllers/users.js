var Sequelize = require('sequelize');
const User = require('../models').User;
const Temperature = require('../models').Temperature;

const Op = Sequelize.Op


exports.getProfile = (req, res, next) => {
  try {
    User.findOne({ where: { email: req.params.email } }).then((user) => {
      if (user) {
        res.json({ success: true, status: 'User Retrieved Successfully!', user: user });
      }
      else {
        res.json({ success: false, status: 'User not registered!', user: null });
      }

    }).catch((err) => {
      console.log(err);
    })
  }
  catch (e) { console.log(e); }
};

exports.searchEmail = (req, res, next) => {
  try {
    let whereCond = {}
    if (req.body.data) {
      whereCond['email'] = {
        [Op.substring]: req.body.data
      }
    }
    User.findAll({ where: whereCond, attributes: ['email'] })
      .then((users) => {
        if (users) {
          res.json({ success: true, status: 'Users retrieved Successfully', users: users });
        }
        else {
          res.json({ success: true, status: 'No Users exists' });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  catch (e) { console.log(e); }
}


exports.updateProfile = (req, res, next) => {
  try {
    User.findOne({ where: { email: req.body.email } })
      .then((user) => {
        if (user) {
          user.update({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, status: req.body.status, role: req.body.role });
          res.json({ success: true, status: 'User updated successfully!' });
        }
        else {
          res.json({ success: false, status: 'No user available!' });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  catch (e) { console.log(e); }
};

exports.getUsers = (req, res, next) => {

  try {
    let filterData = req.body;
    let whereCond = {}
    let fromDate='';
    let toDate='';

    for(let i=0; i<filterData.length; i++){

      if(filterData[i].filterBy=='fromDate'){
        fromDate = filterData[i].value;
      }

      if(filterData[i].filterBy=='toDate'){
        toDate = filterData[i].value;
      }

      if(filterData[i].filterBy =='status'){
          whereCond['status'] = { [Op.in]: filterData[i].value }
      }

      if(filterData[i].filterBy =='role'){
          whereCond['role'] = { [Op.in]: filterData[i].value }
      }
    }

    if ((!fromDate) && (toDate)) {
      whereCond['createdAt'] = { [Op.between]: [new Date(0), new Date(toDate)] }
    }
    else if ((fromDate) && (!toDate)) {
      whereCond['createdAt'] = { [Op.between]: [new Date(fromDate), new Date()] }
    }
    else if ((fromDate) && (toDate)) {
      whereCond['createdAt'] = { [Op.between]: [new Date(fromDate), new Date(toDate)] }
    }

    User.findAll({ where: whereCond, include:[{model:Temperature,as:'temperature'}], order:[[Sequelize.literal('temperature.id'), 'DESC']] })
      .then((users) => {
        if (users) {
          res.statusCode = 200;
          res.json({ success: true, status: 'Users Retrieved Successfully!', users: users });
        }
        else {
          res.statusCode = 200;
          res.json({ success: false, status: 'Problem in retrieving the users', user: null });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  catch (e) { throw e; }
};

exports.postSignup = (req, res, next) => {
  try {
    var user = User.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: req.body.password, status: 'Active', role: 'Admin' });
    user.then((result) => {
      if (result) {
        res.json({ success: true, status: 'Registration Successful!' });
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }
  catch (e) { console.log(e); }
};

exports.postLogin = (req, res, next) => {
  try {
    User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        if (user['dataValues']['password'] == req.body.password) {
          req.session.user = user['dataValues'];
          res.json({ success: true, status: 'You are successfully logged in!' });
        }
        else {
          res.json({ success: false, status: errorMsg });
        }
      }
      else {
        res.json({ success: false, status: errorMsg });
      }
    })
      .catch((err) => {
        console.log(err);
      })
  }
  catch (e) { console.log(e); }
};

exports.logout = (req, res) => {
  if (req.session.user && req.cookies.session_id) {
    res.clearCookie('session-id');
    res.json({ success: true, status: 'You are successfully logged out!' });
  } else {
    res.json({ success: true, status: 'You are successfully logged out!' });
  }
};