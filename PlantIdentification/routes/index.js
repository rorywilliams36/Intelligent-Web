var express = require('express');
var router = express.Router();
var multer = require('multer');

const plants = require('../controllers/plants')
const comments = require('../controllers/comments')
const posts = require('../controllers/posts')


var storage = multer.diskStorage({
  function(req, file, cb) {
    cb(null, 'public/images/uploads/');
  },
  filename: function(req,file, cb) {
    var original = file.originalname;
    var file_extension = original.split('.');
    filename = Date.now() + '.' + file_extension[file_extension.length-1];
    cb(null, filename);
  }
});
let upload = multer({storage: storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Plant' });
});

router.post('/add_plant', function(req, res, next ) {
  let data = req.body;
  let result = plants.create(data);
  console.log(result);
  res.redirect('/');
});
router.post('/add_comment', function(req, res, next) {
  let data = req.body;
  let result = comments.create(data);
  console.log(result);
  res.redirect('/');
});
router.post('/add_post', upload.single('img'), function(req, res, next) {
  let data = req.body;
  let filepath = req.file.path;
  let result = posts.create(data, filepath);
  console.log(result);
  res.redirect('/');
});

router.get('/get_all_plants', function(req,res,next) {
  let result = plants.getAll()
  result.then(plants => {
    let data = JSON.parse(plants);
    console.log(data.length)
    res.render('get_all_plants', {title: 'View Plants', data: data});
  })
});

module.exports = router;
