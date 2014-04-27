/**
 * File: app.js
 * Auth: Cezary Wojcik
 * Desc: This is the main file for cezarywojcik.com
 */

// ---- [ includes ] -----------------------------------------------------------

var app  = require('express')();
var jade = require('jade');

// ---- [ routing ] ------------------------------------------------------------

app.get('/', function(req, res) {
	res.send('Test');
});

// ---- [ run server ] ---------------------------------------------------------

var server = app.listen(3000, function() {
	console.log('Listening on port %d', server.address().port);
});
