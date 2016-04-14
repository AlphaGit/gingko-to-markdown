'use strict';

module.exports = indexTags;

// depends on: ./determine-file-names to have run first
// depends on: ./determine-level-numbers to have run first

var _ = require('lodash');
var forEachTreeNode = require('./util/for-each-tree-node');
var removeDiacritics = require('./util/remove-diacritics');
var getNewItemLevelItemNumber = require('./util/get-new-item-level-item-number');
var generateMarkdownLinkForFileName = require('./util/generate-markdown-link-for-filename');

var TAG_REGEX = /#[^\s#]+/g;

function indexTags(documentTree/*, options*/) {
	var index = {};

	forEachTreeNode(documentTree, function(treeNode) {
		if (!treeNode.content) return;

		console.log('Indexing tags from ' + treeNode.fileName);
		var tagsFound = treeNode.content.match(TAG_REGEX);
		if (!tagsFound) return;

		tagsFound.forEach(function(tag) {
			tag = tag.substring(1); // remove the # from the tag
			index[tag] = index[tag] || [];
			index[tag].push(treeNode.fileName);
		});
	});

	var newItemNumber = getNewItemLevelItemNumber(documentTree);

	documentTree.push({
		itemNumber: newItemNumber,
		fileName: newItemNumber + '-Index.markdown',
		content: generateIndexContent(index)
	});
}

function generateIndexContent(index) {
	var contentString = '# Index\n\n';

	var indexEntriesGrouped = _.groupBy(Object.keys(index), function(e) {
		return removeDiacritics(e.toLowerCase())[0];
	});

	var alphabet = Object.keys(indexEntriesGrouped).sort();

	for (var i = 0; i < alphabet.length; i++) {
		var alphabetLetter = alphabet[i];

		contentString += '## ' + alphabetLetter.toUpperCase() + '\n\n';

		indexEntriesGrouped[alphabetLetter].forEach(function(indexEntry) {
			contentString += '- ' + indexEntry;
			var references = index[indexEntry];

			if (references.length == 1) {
				contentString += ': ' + generateMarkdownLinkForFileName(references[0]) + '\n';
				return; // forEach
			}

			contentString += '\n';
			references.forEach(function(reference) {
				contentString += '    - ' + generateMarkdownLinkForFileName(reference) + '\n';
			});
		});
		contentString += '\n';
	}

	return contentString;
}