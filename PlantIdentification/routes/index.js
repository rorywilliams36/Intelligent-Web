var express = require('express');
var router = express.Router();
var multer = require('multer');

const plants = require('../controllers/plants')
const comments = require('../controllers/comments')

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

router.get('/all_plants', function(req,res,next) {
  let result = plants.getAll()
  result.then(plants => {
    let data = JSON.parse(plants);
    console.log(data.length)
    res.render('all_plants', {title: 'View Plants', data: data});
  })
});

/* GET nickname page. */
router.get('/login', function(req, res, next) {
  res.render('nickname', { title: 'Sign In' });
});

/* GET plant page. */
router.get('/plant/:id', function(req, res, next) {
  let result = plants.getById(req.params.id); // Assuming a function getById exists in your plants controller
  console.log(req.params.id)
  result.then(plant => {
    res.render('plant', { title: 'Plant', data: JSON.parse(plant) });
  }).catch(error => {
    console.error(error);
    res.status(500).send('Error retrieving plant');
  });
});

router.get('/create_plant', function(req,res,next) {
  res.render('create_plant', {title: 'Add Plant'})
});

router.post('/submit-plant', function(req, res, next) {
  const plantData = req.body;
  plantData.Status = plantData.Status === 'on';
  plantData.Leaves = plantData.Leaves === 'on';
  plantData.Flowers = plantData.Flowers === 'on';


  console.log('Form Submitted');
  // res.('Form submitted successfully')

  plants.create(plantData).catch(error => {
    console.error(error);
    res.status(500).send('Error in Submission');
    res.redirect('/');

  });
  res.redirect('/');
});

module.exports = router;
