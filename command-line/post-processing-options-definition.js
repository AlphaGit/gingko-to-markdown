'use strict';

module.exports = PostProcessingOptionsDefinition;

// TODO read post-processing steps and load list of files
var ALLOWED_VALUES = ['strip-tags', 'index-tags'];

function PostProcessingOptionsDefinition(value) {
	if (!(this instanceof PostProcessingOptionsDefinition)) return new PostProcessingOptionsDefinition(value);

	value = (value || '').toLowerCase();
	if (ALLOWED_VALUES.indexOf(value) === -1) {
		console.error('Value "' + value + '" not valid.');
		throw 'Value "' + value + '" not valid.';
	}

	this.value = value;
}