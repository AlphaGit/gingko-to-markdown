'use strict';

module.exports = stripTags;

var Q = require('q');
var forEachTreeNode = require('./util/for-each-tree-node');

var TAG_REGEX = /#[^\s#]+/g;

function stripTags(documentTree/*, options*/) {
	forEachTreeNode(documentTree, function(treeNode) {
		if (!treeNode.content) return;

		console.log('Stripping tags from ' + treeNode.content.split('\n')[0]);
		treeNode.content = treeNode.content.replace(TAG_REGEX, '');
	});

	return Q();
}