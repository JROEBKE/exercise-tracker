const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  bodyParser = require('body-parser');
  timestamps = require('mongoose-timestamp')
  mongoosePaginate = require('mongoose-paginate');
  moment = require("moment"); // timestamp format
  check = require('express-validator'); // Request validation
  validationResult = require('express-validator');
  matchedData = require('express-validator');
  sanitize = require('express-validator');



// create user schema
const userSchema = new Schema({
  userName:{
    type: String,
    required: true,
    unique:true
  }
});

//Plugins mongoose
userSchema.plugin(timestamps);
userSchema.plugin(mongoosePaginate);


// create the model
var userModel = mongoose.model('User', userSchema);


// export the model
module.exports = userModel;
