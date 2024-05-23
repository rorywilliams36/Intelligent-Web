var express = require('express');
var router = express.Router();
var multer = require('multer');

const plants = require('../controllers/plants')
const comments = require('../controllers/comments')

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
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

router.post('/add_plant', upload.single('Img'),function(req, res, next ) {
  let data = req.body;
  let filepath = req.file.path;
  let result = plants.create(data, filepath);
  console.log(result);
  res.redirect('/');
});
router.post('/add_comment', function(req, res, next) {
  let data = req.body;
  let result = comments.create(data);
  console.log(result);
  res.redirect('/');
});

router.get('/all_plants', function(req, res, next) {
  let result = plants.getAll();
  result.then(plant => {
    let data = JSON.parse(plant);
    console.log('Should I filter?');

    if (Object.keys(req.query).length > 0) {
      console.log('Applying filter...');
      // Call filterPlants from plantsController
      data = plants.filterPlants(data, req.query);
    }

    console.log('Should I sort?', req.query.sort);

    if (req.query.sort) {
      console.log('Applying sort...');
      // Call sortPlants from plantsController
      console.log('Sorting by:', req.query.sort);
      // console.log('before', data)
      if (req.query.sort != 'location') {
        data = plants.sortPlants(data, req.query.sort);
        res.render('all_plants', { title: 'All Plants', data: data });
      } 
      else {
        plants.sortPlantsByLocation(data)
          .then(sortedPlants => {
              console.log('Sorted plants:', sortedPlants);
              res.render('all_plants', { title: 'All Plants', data: sortedPlants});
              
          })
          .catch(error => {
              console.error('Error getting user location:', error);
          });
      }
    } else {
      res.render('all_plants', { title: 'All Plants', data: data });
    }

    
  }).catch(error => {
    console.error('Error:', error);
    res.status(500).send('An error occurred');
  });
});

router.get('/every_plant', function(req, res, next) {
    let results = plants.getAll().then(results => {
        console.log(results);
        return res.status(200).send(results)
    }).catch(err => {
        console.log(err);
        return res.status(500).send(err);
    });
})

/* GET nickname page. */
router.get('/login', function(req, res, next) {
  res.render('nickname', { title: 'Sign In' });
});

/* GET plant page. */
router.get('/plant/:id', async (req, res, next) => {
  try {
      const plantId = req.params.id;

      // Fetch plant details
      const plant = await plants.getById(plantId);
      console.log('Plant loaded!');

      // Fetch plant comments
      const plantComments = await comments.getPlantMessages(plantId);
      console.log('Comments loaded!');

      // Parse plant and comments data
      const data = JSON.parse(plant);
      const parsedComments = JSON.parse(plantComments);

      var plantData = null

      // Fetch additional plant data by name
      if (data.Identification_Name !== 'Unknown') {
        var plantData = await plants.getPlantData(data.Identification_Name);
      }
      
      // Render the view with all the data
      res.render('plant', {
          title: data.Plant_Name,
          data: data,
          comments: parsedComments,
          plantData: plantData
      });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Gets page to add plants
router.get('/create_plant', function(req,res,next) {
  res.render('create_plant', {title: 'Add Plant'})
});

// For plant form submission
router.post('/submit-plant', upload.single('Img'), function(req, res, next) {
  const plantData = req.body;
  // Tries to get filepath from the request
  let filepath;
  try {
    filepath = req.file.path;
  }
  catch(e) {
    filepath = null
  }

  // Set values from checkboxes to true/false
  plantData.Status = plantData.Status === 'on';
  plantData.Leaves = plantData.Leaves === 'on';
  plantData.Flowers = plantData.Flowers === 'on';

  console.log('Form Submitted');

  // Add data to db
  plants.create(plantData, filepath).catch(error => {
    console.error(error);
    res.status(500).send('Error in Submission');
    res.redirect('/');
  });
  res.redirect('/');
});

module.exports = router;
