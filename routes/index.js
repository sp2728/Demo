var express = require('express');
var router = express.Router();
var IndexController = require('../controllers/index');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/recordTemperature',IndexController.recordTemperature);

router.post('/getTempRecords', IndexController.getTempRecords);

module.exports = router;
