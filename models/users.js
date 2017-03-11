var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
/*	github: {
		id: String,
		displayName: String,
		username: String,
      publicRepos: Number
	},
*/
   polls: {
      topic: String,
      question: String,
      answers: [{
         choice : String,
         count : Number
      }]
   }

}, { versionKey: false });

module.exports = mongoose.model('User', UserSchema);
