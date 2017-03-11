var User = require('../models/users.js');

function queryHandler() {
    
    this.getAll = function(req, res) {      // list all polls by all users
        User
			.find({}, { '_id': false })
			
			.exec(function (err, result) {
				if (err) { throw err; }
				
				console.log('all displayed');
				res.json(result);
				//when you use find() all, the result is an array, not json
			});
    }
    
    this.createPoll = function (req, res) {
		var user = new User();
		var newTopic = req.body.newtopic;
		user.polls.topic = newTopic;
		user.polls.question = req.body.newquestion;
		var arr = req.body.newanswers.split('\n');
		
		for (var i = 0; i < arr.length; i++) {
			user.polls.answers[i] = {
        		choice: arr[i],
        		count: 1
    		}
		}

		user.save(function(err) {
			if(err) {console.log(err)};
			res.redirect('/');
		})
	};
    
    this.findPoll = function(req, res) {
		var thetopic = req.params.topic;

		User
			.findOne({'polls.topic': thetopic}, { '_id': false })
			
			.exec(function (err, result) {
				if (err) { throw err; }

				console.log('A poll retrieved');
				res.json(result.polls);
			});
	};
	
	this.addVote = function(req, res) {
		var thetopic = req.params.topic;
		var theindex = req.params.index;
		var str = 'polls.answers.' + theindex + '.count';
		var incr = {};
		incr[str] = 1;	// increment by 1
		
		User
			.findOneAndUpdate({ 'polls.topic' : thetopic}, { $inc: incr}, {new: true})
				// the $ positional operator saves the index of the element from the array that matched the query
			
			.exec(function (err, result) {
				if (err) { throw err; }

				console.log('Vote added', result.polls.answers[theindex]);
				
				res.json(result.polls);
			});
			

	};
	
	this.addAnswer = function(req, res) {
		var thetopic = req.params.topic;
		var theanswer = req.body.newAnswer;
		User
			.findOneAndUpdate({ 'polls.topic' : thetopic}, 
			{ $push: {'polls.answers': {choice: theanswer, count: 1}}}, {new: true})
				
			
			.exec(function (err, result) {
				if (err) { throw err; }

				console.log('New answer added ', thetopic, theanswer);
				
				res.redirect('/');
			});
	};
	
	this.delete = function(req, res) {
		var thetopic = req.params.topic;

		User
			.remove({'polls.topic': thetopic}, function(err) {
				if (err) { throw err; }
				
				console.log('Poll removed', thetopic);
			});
	};
    
}

module.exports = queryHandler;
