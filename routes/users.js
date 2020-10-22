var express = require('express');
var router = express.Router();
var UserController = require('../controllers/users');


router.get('/profile/:email', UserController.getProfile);

router.put('/profile', UserController.updateProfile);

router.post('/getUsers', UserController.getUsers);

router.post('/searchEmail', UserController.searchEmail)

router.post('/signup', UserController.postSignup);

router.post('/login', UserController.postLogin);

router.get('/logout', UserController.logout);

module.exports = router;
