'use strict';

module.exports = determineLevelNumbers;

function determineLevelNumbers(documentTree, options) {
	determineLevelNumbersForArray(documentTree, '', 0);
};

function determineLevelNumbersForArray(jsonObject, levelPrefix, nestingLevel) {
	var levelItemNumber = 1;
	for (var i in jsonObject) {
		var object = jsonObject[i];
		determineLevelNumbersForObject(object, levelPrefix + levelItemNumber, nestingLevel);
		levelItemNumber++;
	}
}

function determineLevelNumbersForObject(jsonObject, completeItemLevelNumber, nestingLevel) {
	if (jsonObject.content) {
		jsonObject.nestingLevel = nestingLevel;
		jsonObject.itemNumber = completeItemLevelNumber;
	}

	if (jsonObject.children) {
		determineLevelNumbersForArray(jsonObject.children, completeItemLevelNumber + '.', nestingLevel + 1);
	}
}