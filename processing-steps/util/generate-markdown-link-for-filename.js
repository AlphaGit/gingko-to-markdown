'use strict';

var path = require('path');

module.exports = function generateMarkdownLinkForFileName(destFilePath, originFilePath) {
	var linkName = path.basename(destFilePath, '.markdown');
	var linkReference = path.relative(path.dirname(originFilePath), destFilePath);

	return '[' + linkName + '](' + linkReference + ')';
}