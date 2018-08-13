var User = require('../models/user');

module.exports = {
  showUser: showUser,
  addUser: addUser
}

/**
 * Find userID by Username
 */
 function showUser(req, res) {

   // validate information
   req.checkQuery('userName', 'You must provide a user name').notEmpty();

   // if there are errors, redirect and save errors to flash
   const errors = req.validationErrors();
   if (errors) {
     req.flash('errors', errors.map(err => err.msg));
     return res.redirect('/');
   }
   var userName = req.query.userName;
   console.log(userName);

   // search for userName
   User.findOne({ userName: userName }, (err, user) => {
     if (err) {
       req.flash('errors', 'There was no user found with this name');
       res.status(404);redirect('/'+'?userName='+user.userName);
     } else {
       console.log("user searched");
       console.log(user.id);

       req.flash('success', 'Successfully found user '+user.userName+' with id '+user.id);
       res.redirect('/'+'?userId='+user.id+'&userName='+user.userName);

     }

   });
 }



 /**
  * Process the user creation form
  */
 function addUser(req, res) {
   // validate information
   req.checkBody('userName', 'You must provide a user name').notEmpty();
  console.log("validation user added passed");

   // create a new user
   const user = new User({
	     userName : req.body.userName
   });



   // if there are errors, redirect and save errors to flash
   const errors = req.validationErrors();
   if (errors) {
     req.flash('errors', errors.map(err => err.msg));
     return res.redirect('/'+'?userName='+user.userName);
   }

   // save user
   user.save(function(err) {
     if (err){
       req.flash('errors', 'username already in use!');
       return res.redirect('/');
     }
       // set a successful flash message
     req.flash('success', 'Successfully created User!');
     console.log("user added");
     console.log(user);
       // redirect to the home page
     res.redirect('/'+'?userId='+user.id);
   });
}
