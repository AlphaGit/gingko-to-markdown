'use strict';

module.exports = function forEachTreeNode(documentTree, fn) {
	fn(documentTree);

	if (documentTree.length) {
		documentTree.forEach(function(i) {
			forEachTreeNode(i, fn);
		});
	}

	if (documentTree.children) {
		forEachTreeNode(documentTree.children, fn);
	}
};