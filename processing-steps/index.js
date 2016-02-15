'use strict';

module.exports = {
	processContent: initiateProcessingSteps
};

function initiateProcessingSteps(content, options) {
	var processingFunctions = loadProcessingFunctions(content, options);

	for (var i = 0; i < processingFunctions.length; i++) {
		var ppFunction = processingFunctions[i];
		ppFunction(content, options);
	}

	return content;
}

function loadProcessingFunctions(content, options) {
	var processingFunctions = [];

	// load processing required at first
	processingFunctions.push(require('./determine-level-numbers'));
	processingFunctions.push(require('./determine-file-names'));

	// load user requested processing options

	if (options.processTags.value == 'strip')
		processingFunctions.push(require('./strip-tags'));

	if (options.processTags.value == 'index')
		processingFunctions.push(require('./tags-to-index'));

	// load processing required at last
	processingFunctions.push(require('./disk-writer'));

	return processingFunctions;
}