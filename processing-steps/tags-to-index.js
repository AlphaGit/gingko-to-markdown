'use strict';

module.exports = stripTags;

// depends on: ./determine-file-names to have run first
// depends on: ./determine-level-numbers to have run first

var _ = require('lodash');
var forEachTreeNode = require('./util/for-each-tree-node');
var removeDiacritics = require('./util/remove-diacritics');

var TAG_REGEX = /#[^\s#]+/g;

function stripTags(documentTree/*, options*/) {
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

	var newItemNumber = getIndexLevelItemNumber(documentTree);
	
	documentTree.push({
		itemNumber: newItemNumber,
		fileName: newItemNumber + '-Index.markdown',
		content: generateIndexContent(index)
	});
}

function getIndexLevelItemNumber(documentTree) {
	var lastItemNumber = documentTree[documentTree.length - 1].itemNumber;
	var itemNumberParts = lastItemNumber.split('.');

	var lastItemNumberPartIndex = itemNumberParts.length - 1;
	var lastItemNumberPart = itemNumberParts[lastItemNumberPartIndex];
	itemNumberParts[lastItemNumberPartIndex] = (+lastItemNumberPart) + 1;
	
	return itemNumberParts.join('.');
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

function generateMarkdownLinkForFileName(fileName) {
	return '[' + fileName.split('.markdown')[0] + '](' + fileName + ')';
}