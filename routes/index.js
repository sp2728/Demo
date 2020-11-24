var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/recordTemperature',IndexController.recordTemperature);

router.post('/getTempRecords', IndexController.getTempRecords);

router.post('/checkCabinInfo', IndexController.checkCabinInfo);

router.post('/generateToken', IndexController.generateToken);

router.get('/getLocationInputs', IndexController.getLocationInputs);

router.get('/qr/parser', IndexController.parseQRCode);

router.get('/getLocationDetails', IndexController.getLocationDetails);

router.get('/getCurrentToken', IndexController.getCurrentToken);

router.post('/guestAuthorization', IndexController.guestAuthorization);

router.get('/guestLogout', IndexController.guestLogout);

module.exports = router;
