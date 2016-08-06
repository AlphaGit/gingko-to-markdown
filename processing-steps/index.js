'use strict';

module.exports = {
	processContent: initiateProcessingSteps
};
var Q = require('q');

function initiateProcessingSteps(content, options) {
	var processingFunctions = loadProcessingFunctions(content, options);

	var promises = [];
	for (var i = 0; i < processingFunctions.length; i++) {
		var ppFunction = processingFunctions[i];
		promises.push(ppFunction(content, options));
	}

	return Q.all(promises);
}

function loadProcessingFunctions(content, options) {
	var processingFunctions = [];

	// load processing required at first
	processingFunctions.push(require('./determine-level-numbers'));
	processingFunctions.push(require('./determine-file-names'));

	// load user requested processing options
	var postProcessingRequired = (options.postProcessing || []).map(function(p) { return p.value });

	postProcessingRequired.forEach(function(p) {
		processingFunctions.push(require('./' + p));
	});

	// load processing required at last
	processingFunctions.push(require('./disk-writer'));

	return processingFunctions;
}