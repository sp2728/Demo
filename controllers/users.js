const User = require('../models/users');
var Sequelize = require('sequelize');
const Op = Sequelize.Op

exports.getProfile = (req, res, next) =>{
    // res.render('profile', { title: 'Profile', user:req.session.user });
    User.findOne({ where:{email:req.params.email}}).then((user)=>{
      if(user){
        res.json({ success: true, status: 'User Retrieved Successfully!', user: user['dataValues'] });
      }
      else{
        res.json({ success: false, status: 'User not registered!', user: null });
      }
  
    }).catch((err)=>{
      console.log(err);
    })
};

exports.updateProfile = (req, res, next)=>{
    console.log(req.body.email)
    User.findOne({ where:{email:req.body.email}}).then((user)=>{
      if(user){
        user.update({firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:req.body.password, status:req.body.status, role:req.body.role});
        res.json({ success: true, status: 'User updated successfully!' });
      }
      else{
        res.json({ success: false, status: 'No user available!' });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  };

exports.getUsers = (req,res,next)=>{

    try{
    if(req.body.fromDate==''){
      req.body.fromDate = new Date(0);
    }
    
    if(req.body.toDate==''){
      req.body.toDate = new Date(Date.now());
    }
    
    if(req.body.role=='' || req.body.role=='Both'){
      req.body.role = ['Admin', 'Super-Admin']
    }
    else{
      req.body.role= [req.body.role]
    }
    
    if(req.body.status=='' || req.body.status=='Both'){
      req.body.status = ['Active', 'Inactive']
    }
    else{
      req.body.status = [req.body.status]
    }
    
    let whereCond = {
      createdAt:{
        [Op.between]:[ new Date(req.body.fromDate), new Date(req.body.toDate)]
      },
      role: {
         [Op.in]: req.body.role
      },
      status: {
        [Op.in]: req.body.status 
      }
    } 
    
    User.findAll({where:whereCond, raw:true})
      .then((users)=>{
        if(users){
          res.statusCode=200;
          res.json({ success: true, status: 'Users Retrieved Successfully!', users: users });
        }
        else{
          res.statusCode=200;
          res.json({ success: false, status: 'Problem in retrieving the users', user: null });
        }
    
      }).catch((err)=>{
        console.log(err);
      })
    }
    catch(e){
      throw e;
    }
};

exports.postSignup = (req, res, next)=>{
    var user = User.create({firstName:req.body.firstName, lastName:req.body.lastName, email:req.body.email, password:req.body.password, status:'Active', role:'Admin'});
    user.then((result)=>{
      if(result){
        res.json({ success: true, status: 'Registration Successful!' });
        // res.redirect('/login')
      }
    }).catch((err)=>{
      console.log(err);
    })
};

exports.postLogin = (req, res, next)=>{
    User.findOne({ where:{email:req.body.email}}).then((user)=>{
      if(user){
       if(user['dataValues']['password'] == req.body.password){
         req.session.user = user['dataValues'];
         res.json({ success: true, status: 'You are successfully logged in!' });
       }
       else{
         res.json({ success: false, status: errorMsg });
       }
      }
      else{
       res.json({ success: false, status: errorMsg });
      }
     })
     .catch((err)=>{
       console.log(err);
     })
};

exports.logout = (req, res)=>{
    if (req.session.user && req.cookies.session_id) {
      res.clearCookie('session-id');
      // res.redirect('/login');
      res.json({ success: true, status: 'You are successfully logged out!' });
  } else {
    res.json({ success: true, status: 'You are successfully logged out!' });
  }
};