'use strict';

module.exports = function getNewItemLevelItemNumber(documentTree) {
	var lastItemNumber = documentTree[documentTree.length - 1].itemNumber;
	var itemNumberParts = lastItemNumber.split('.');

	var lastItemNumberPartIndex = itemNumberParts.length - 1;
	var lastItemNumberPart = itemNumberParts[lastItemNumberPartIndex];
	itemNumberParts[lastItemNumberPartIndex] = (+lastItemNumberPart) + 1;
	
	return itemNumberParts.join('.');
};