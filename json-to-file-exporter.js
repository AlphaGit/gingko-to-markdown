'use strict';

module.exports = {
	dumpJson: dumpJson
};

var Q = require('q');
var fs = require('fs');

function dumpJson(jsonObject, outputDir, currentLevel) {
	if (!currentLevel) currentLevel = '1';

	// if this node has content, dump it into a file
	if (jsonObject.content) dumpOneFile(jsonObject.content, outputDir, currentLevel);

	// can somebody think of thE CHILDREN?!
	if (!jsonObject.children) return;

	// recursively call this function for each of the children for this node
	var promisesToWaitFor = [];
	for (var index in jsonObject.children) {
		var childContent = jsonObject.children[index];
		index++;
		promisesToWaitFor.push(dumpJson(childContent, outputDir, currentLevel + '.' + index));
	}

	return Q.all(promisesToWaitFor);
};

var qWriteFile = Q.nfbind(fs.writeFile);
function dumpOneFile(content, outputDir, currentLevel) {
	// infer file name from first line (title) and currentLevel
	var firstLine = content.split('\n')[0];
	var fileName = currentLevel + '-' + firstLine + '.markdown';

	// dump contents to file name in outputDir
	return qWriteFile(outputDir + '/' + fileName, content);
}