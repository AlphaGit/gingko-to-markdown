'use strict';

module.exports = {
	dumpJson: initiateDump
};

var Q = require('q');
var fs = require('fs');

function initiateDump(jsonObject, outputDir) {
	var deferred = Q.defer();

	fs.mkdir(outputDir, function (err) {
		if (err) {
			deferred.reject(err);
		} else {
			deferred.resolve(dumpJsonForArray(jsonObject, outputDir, '', 1));
		}
	})

	return deferred.promise;
}

function dumpJsonForArray(jsonObject, outputDir, levelPrefix, levelItemNumber) {
	var promisesToWaitFor = [];
	for (var i in jsonObject) {
		var object = jsonObject[i];
		promisesToWaitFor.push(dumpJsonForObject(object, outputDir, levelPrefix, levelItemNumber));
		levelItemNumber++;
	}

	return Q.all(promisesToWaitFor);
}

function dumpJsonForObject(jsonObject, outputDir, levelPrefix, levelItemNumber) {
	// if this node has content, dump it into a file
	var promisesToWaitFor = [];
	if (jsonObject.content) {
		promisesToWaitFor.push(writeFile(jsonObject.content, outputDir, levelPrefix + levelItemNumber));
	} 

	// recursively call this function for each of the children for this node
	var childrenPromises = dumpJsonForArray(jsonObject.children, outputDir, levelPrefix + levelItemNumber + '.');
	promisesToWaitFor = promisesToWaitFor.concat(childrenPromises);

	return Q.all(promisesToWaitFor);
};

var qWriteFile = Q.nfbind(fs.writeFile);
function writeFile(content, outputDir, fullLevelNumber) {
	// infer file name from first line (title) and fullLevelNumber
	var firstLine = content.split('\n')[0];
	var fileName = fullLevelNumber + '-' + firstLine + '.markdown';
	fileName = stripNonValidCharacterForFiles(fileName);

	// dump contents to file name in outputDir
	console.log('Writing to ' + fileName);
	return qWriteFile(outputDir + '/' + fileName, content);
}

var invalidCharactersMatcher = /[\?#\\]/g;
function stripNonValidCharacterForFiles(fileName) {
	return fileName.replace(invalidCharactersMatcher, '');
}