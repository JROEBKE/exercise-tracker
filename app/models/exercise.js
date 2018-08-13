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


// create a schema
const exerciseSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  exercise: {
  	type: String,
  	required: true
  },
  duration: {
  	type: String,
  	required: true
  },
  date: {
    type: String,
    required: true
  }
});

//Plugins mongoose
exerciseSchema.plugin(timestamps);
exerciseSchema.plugin(mongoosePaginate);

// create the model
var exerciseModel = mongoose.model('Exercise', exerciseSchema);

// export the model
module.exports = exerciseModel;
