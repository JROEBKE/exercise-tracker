var Exercise = require('../models/exercise');
var User = require('../models/user');

module.exports = {
  showExercise: showExercise,
  addExercise: addExercise
}

/**
 * Show all exercises based on query
 */
 function showExercise(req, res) {
       // validate information
       req.checkQuery('userId', 'You must provide a user id').notEmpty();

        // limit set to 5000 to cap load
       var limit = (parseInt(req.query.limit)) || (parseInt(5000));
       var page = 1;
       console.log(limit);

       //filter based on dates from and to
       var since = (req.query.since) || ("0000-01-01");
       var until = (req.query.until) || ("9999-12-31");
       console.log(since);
       console.log(until);

       var userId= req.query.userId;
       console.log(userId);

       // sorting ascendencing default, ignored if generic search
       var sort = req.query.sort || 'asc'; // must be defined to hand it over
       if (req.query.sort !== 'asc') {
         var sort = -1;
       }
       else {
         var sort = 1;
       }


       // if there are errors, redirect and save errors to flash
       const errors = req.validationErrors();
        if (errors) {
         req.flash('errors', errors.map(err => err.msg));
          console.log("search error");
        return res.redirect('/'+'?userId='+userId);
      }

      // check if user exists
      var id = req.body.userId;
      console.log(id);
      User.findById(id, (err, user) => {
        // somehow error is not shown
        if (err) {
          // redirect to home with error because user does not exist
          req.flash('errors', 'There was no user found with this id '+id);
          console.log("user not found "+id);
          // keep other values only not
          res.redirect('/');
        }
        else {

          // ich muss in die suche noch from and to einbauen
          // show all exercises for userId
         Exercise
            .find({userId: userId, date: {$gte: since, $lt: until}})
            .skip((limit * page) - limit)
            .sort({id: sort})
            .limit(limit)
            .exec(function(err, exercises) {
              Exercise.count().exec(function(err, count) {
                if (err) return next(err)
                console.log(exercises);
                console.log("exercise searched");
                res.json(exercises);
                /** maybe later I will print it on page
                res.render('pages/home', {
                  exercises: exercises,
                  current: page,
                  errors: req.flash('errors'),
                  success: req.flash('success'),
                  pages: Math.ceil(count / limit),
                })
                */
              })
            });
        }
    });
}


 /**
  * add Excercise
  */
 function addExercise(req, res) {
   // validate information if all data is available
   req.checkBody('userId', 'UserId must be provided').notEmpty();
   req.checkBody('duration', 'duration must be provided').notEmpty();
   req.checkBody('exercise', 'exercise must be provided').notEmpty();
   req.checkBody('date', 'date must be provided').isDate();

   // create a new exercise
   const exercise = new Exercise({
	     userId     : req.body.userId,
	     exercise 	: req.body.exercise,
	     duration  	: req.body.duration,
	     date     	: req.body.date
   });

   // if there are errors, redirect and save errors to flash
   const errors = req.validationErrors();
   if (errors) {
     req.flash('errors', errors.map(err => err.msg));
     return res.redirect('/'+'?userId='+exercise.userId+'&duration='+exercise.duration+'&exercise='+exercise.exercise+'&date='+exercise.date);
   }
  console.log("validation achieved");

  // check if user exists
  var id = req.body.userId;
  console.log(id);
  User.findById(id, (err, user) => {
    if (err) {
      // redirect to home with error because user does not exist
      req.flash('errors', 'There was no user found with this id '+id);
      console.log("user not found "+id);
      // keep other values only not
      res.redirect('/'+'?duration='+exercise.duration+'&exercise='+exercise.exercise+'&date='+exercise.date);
    }
    else {

      // save exercise because user exists
      exercise.save(function(err) {
        if (err){
          req.flash('errors', 'Wrong input!'); // struggle to include dynamic link to existing entry +'
          console.log(exercise);
          return res.redirect('/'+'?userId='+exercise.userId+'&duration='+exercise.duration+'&exercise='+exercise.exercise+'&date='+exercise.date);
        }
          // set a successful flash message
        console.log(exercise);
        console.log("exercise added");
        req.flash('success', 'Successfully added exercise!');
        res.redirect('/'+'?userId='+exercise.userId);
      });
    }
  });
}
