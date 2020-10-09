var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users');


router.get('/profile/:email', UserController.getProfile);

router.put('/profile', UserController.updateProfile);

router.post('/getUsers', UserController.getUsers);

router.post('/signup', UserController.postSignup);

router.post('/login', UserController.postLogin);

router.get('/logout', UserController.logout);

module.exports = router;


// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// router.get('/login', (req, res, next)=> {
//   res.render('login', { title: 'Login' });
// });

// router.get('/profile', (req, res, next) =>{
//   res.render('profile', { title: 'Profile', user:req.session.user });
// });

// router.get('/signup', (req, res, next)=> {
//   res.render('signup', { title: 'Signup' });
// });
