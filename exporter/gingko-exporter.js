'use strict';

module.exports = {
	exportTree: exportTree
}

var https = require('https');
var Q = require('q');

function exportTree(treeId, username, password) {
	var deferred = Q.defer();

	var treeExportUrl = 'https://' + username + ':' + password + '@gingkoapp.com/api/export/' + treeId + '.json';

	https.get(treeExportUrl, function(response) {
		var responseBody = '';

		response.on('data', function(d) {
			responseBody += d;
		});

		response.on('end', function() {
			deferred.resolve(responseBody);
		});
	}).on('error', function(error) {
		deferred.reject(error);
	});

	return deferred.promise;
}