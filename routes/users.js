var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    Fullname:'Boonyanutch Onkling'
  })
});

router.get('/bio',function(req, res, next){
  res.status(200).json({
    fullname: "Boonyanutch Onkling",
    nickname: "Pareploy",
    hobby: "Play Game",
    gitusername: "BoonyaOnkling"
  })
});

module.exports = router;
