'use strict';

var username = process.env['USERNAME'];
var password = process.env['PASSWORD'];

console.log('username', username);
console.log('password', password);
// argv[0] will be node
// argv[1] will be this script
var treeId = process.argv[2];
console.log('tree id', treeId);
var outputDir = process.argv[3];

var https = require('https');

var treeExportUrl = 'https://' + username + ':' + password + '@gingkoapp.com/api/export/' + treeId + '.json';

https.get(treeExportUrl, function(response) {
	var responseBody = '';
	response.on('data', function(d) {
		responseBody += d;
	});
	response.on('end', function() {
		console.log(responseBody);
	});
}).on('error', function(error) {
	console.error(error);
});
