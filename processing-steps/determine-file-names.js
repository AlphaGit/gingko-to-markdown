'use strict';

// depends on: ./determine-level-numbers to have run first

module.exports = determineFileNames;
var Q = require('q');
var forEachTreeNode = require('./util/for-each-tree-node');

function determineFileNames(documentTree, options) {
	forEachTreeNode(documentTree, function(treeNode) {
		if (!treeNode.content) return;

		var firstLine = treeNode.content.split('\n')[0];
		var fileName = treeNode.itemNumber + '-' + firstLine + '.markdown';

		treeNode.fileName = options.bookOutput + '/' + stripNonValidCharacterForFiles(fileName);
	});
	return Q();
};

var invalidCharactersMatcher = /[\?#\\/]/g;
function stripNonValidCharacterForFiles(fileName) {
	return fileName.replace(invalidCharactersMatcher, '');
}