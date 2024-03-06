var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plant' });
});
/* GET nickname page. */
router.get('/login', function(req, res, next) {
  res.render('nickname', { title: 'Sign In' });
});
/* GET plant page. */
router.get('/plant', function(req, res, next) {
  res.render('plant', { title: 'Poison Ivy - Plant' });
});
module.exports = router;
