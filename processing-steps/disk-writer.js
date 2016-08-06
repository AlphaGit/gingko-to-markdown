'use strict';

module.exports = initiateDump;

var Q = require('q');
var fs = require('fs');
var forEachTreeNode = require('./util/for-each-tree-node');

function initiateDump(jsonObject, options) {
	var deferred = Q.defer();

	fs.mkdir(options.rootOutput, function (err) {
		// we don't care if the directory already exists
		if (err && err.code !== 'EEXIST') {
			deferred.reject(err);
			return;
		}
		
		fs.mkdir(options.bookOutput, function (err) {
			// we don't care if the directory already exists
			if (err && err.code !== 'EEXIST') {
				deferred.reject(err);
				return;
			}

			deferred.resolve(dumpJsonForArray(jsonObject));
		});
	});

	return deferred.promise;
}

function dumpJsonForArray(jsonObject) {
	var promisesToWaitFor = [];

	forEachTreeNode(jsonObject, function(treeNode) {
		if (!treeNode.fileName || !treeNode.content) return;

		promisesToWaitFor.push(writeFile(treeNode.fileName, treeNode.content));
	});

	return Q.all(promisesToWaitFor);
}

var qWriteFile = Q.nfbind(fs.writeFile);
function writeFile(fileName, content, outputDir) {
	// dump contents to file name in outputDir
	console.log('Writing to ' + fileName);
	return qWriteFile(fileName, content);
}
