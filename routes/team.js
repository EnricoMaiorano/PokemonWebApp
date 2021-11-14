var express = require('express');
var router = express.Router();
var events = require('events');





/* GET users listing. */
router.get('/create', function(req, res, next) {

  res.render('team', { title: 'Create Team' });



});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'List Team' });
});




module.exports = router;
