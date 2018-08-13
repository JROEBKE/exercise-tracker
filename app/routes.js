// create a new express router
const express      = require('express'),
  router           = express.Router(),
  mainController   = require('./controllers/main.controller'),
  usersController   = require('./controllers/users.controller'),
  exercisesController = require('./controllers/exercises.controller');


// export router
module.exports = router;

// show home page
router.get('/', mainController.showHome);

// user routes
router.get('/users/user',  usersController.showUser);
router.post('/users/create', usersController.addUser);

// exercise routes
//router.get('/exercises/:userId', exercisesController.showExercise);
router.get('/exercises/log', exercisesController.showExercise);
router.post('/exercises/create', exercisesController.addExercise);
