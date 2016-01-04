'use strict';

module.exports = {
	loadPostProcessing: loadPostProcessing,
	postProcess: postProcessContent
};

var postProcessFunctions = [];
function loadPostProcessing(options) {
	if (options.processTags.value == 'strip')
		postProcessFunctions.push(require('./strip-tags'));

	if (options.processTags.value == 'link')
		postProcessFunctions.push(require('./tags-to-links'));

	return postProcessFunctions;
}

function postProcessContent(content, options) {
	// if this is an array, process each item
	if (content.length) {
		content = content.map(function(ci) {
			return postProcessContent(ci, options);
		});
	}

	// if this is an item, process its content
	if (content.content) {
		for (var postProcessFunctionsIndex = 0; postProcessFunctionsIndex < postProcessFunctions.length; postProcessFunctionsIndex++) {
			var postProcessFunction = postProcessFunctions[postProcessFunctionsIndex];
			content.content = postProcessFunction(content.content, options);
		}
	}

	// if this contains children, process them as an array
	if (content.children && content.children.length) {
		content.children = postProcessContent(content.children, options);
	}

	return content;
}