'use strict';

var username = process.env['USERNAME'];
var password = process.env['PASSWORD'];

// argv[0] will be node, argv[1] will be this script
var treeId = process.argv[2];
var outputDirPath = process.argv[3];

var gingkoExporter = require('./gingko-exporter');
var jsonToFileExporter = require('./json-to-file-exporter');

exportFromGingko()
	.then(stringToJson)
	.then(dumpJsonToFiles)
	.then(function() {
		console.log('Done!');
	})
	.catch(showError);

// each of the steps implementations follow below //

function exportFromGingko() {
	console.log('Exporting tree from Gingko...');
	return gingkoExporter.exportTree(treeId, username, password);
}

function stringToJson(text) {
	console.log('Parsing result...');
	return JSON.parse(text);
}

function dumpJsonToFiles(jsonObject) {
	console.log('Dumping to files...');
	return jsonToFileExporter.dumpJson(jsonObject, outputDirPath);
}

function showError(error) {
	console.error(error);
}