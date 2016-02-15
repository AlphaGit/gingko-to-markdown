'use strict';

module.exports = determineLevelNumbers;

function determineLevelNumbers(documentTree, options) {
	determineLevelNumbersForArray(documentTree, '');
};

function determineLevelNumbersForArray(jsonObject, levelPrefix) {
	var levelItemNumber = 1;
	for (var i in jsonObject) {
		var object = jsonObject[i];
		determineLevelNumbersForObject(object, levelPrefix + levelItemNumber);
		levelItemNumber++;
	}
}

function determineLevelNumbersForObject(jsonObject, completeItemLevelNumber) {
	if (jsonObject.content) {
		jsonObject.itemNumber = completeItemLevelNumber;
	}

	if (jsonObject.children) {
		determineLevelNumbersForArray(jsonObject.children, completeItemLevelNumber + '.');
	}
}