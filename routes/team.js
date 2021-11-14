var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('team', { title: 'Create Team' });
});

router.get('/list', function(req, res, next) {
  res.render('list', { title: 'Create Team' });
});




module.exports = router;
