var root = process.cwd(); //current working directory is the root
var QueryHandler = require(root + '/assets/queryHandler.js');

module.exports = function(app) {
    
    var queryHandler = new QueryHandler();

    app.route('/api/createpoll')
        .post(queryHandler.createPoll);

    app.route('/api/poll/:topic')
        .get(queryHandler.findPoll)
        .delete(queryHandler.delete);

    app.route('/api/all')
        .get(queryHandler.getAll);
        
    app.route('/api/mod/:topic/:index')    
	    .get(queryHandler.addVote);

    app.route('/api/addAnswer/:topic')
        .post(queryHandler.addAnswer);
};
