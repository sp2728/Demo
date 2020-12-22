var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/recordTemperature',IndexController.recordTemperature);

router.post('/getTempRecords', IndexController.getTempRecords);

router.get('/organisation-hierarchy/bc/:shipid', IndexController.getShipLocations);

router.post('/queue/token', IndexController.generateToken);

router.get('/location/serviceinputs/:locationId', IndexController.getLocationInputs);

router.get('/qr/parse', IndexController.parseQRCode);

router.get('/location/:id', IndexController.getLocationDetails);

router.get('/queue/currenttoken', IndexController.getCurrentToken);

router.post('/auth/login', IndexController.guestAuthorization);

router.get('/guestLogout', IndexController.guestLogout);

router.get('/locationAvailability', IndexController.locationAvailability);

router.get('/users', IndexController.guestLists)

router.get('/me', IndexController.guestDetail);

router.get('/queue/token/:tokenId', IndexController.tokenDetails)

module.exports = router;
