'use strict';

module.exports = TagsProcessingOptionsDefinition;

var ALLOWED_VALUES = ['strip', 'index'];

function TagsProcessingOptionsDefinition(value) {
	if (!(this instanceof TagsProcessingOptionsDefinition)) return new TagsProcessingOptionsDefinition(value);

	value = (value || '').toLowerCase();
	if (ALLOWED_VALUES.indexOf(value) === -1)
		throw 'Value «' + value + '» not valid.';

	this.value = value;
}