'use strict';

module.exports = function generateMarkdownLinkForFileName(fileName) {
	return '[' + fileName.split('.markdown')[0] + '](' + fileName + ')';
}