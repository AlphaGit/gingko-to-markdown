'use strict';

var options = parseCommandLineArguments();

if (options.help) {
	showCommandLineUsage();
	process.exit(0);
}

validateCommandLineArguments(options);

var gingkoExporter = require('./exporter/gingko-exporter');
var jsonToFileExporter = require('./exporter/json-to-file-exporter');
var postProcessor = require('./post-processing');

postProcessor.loadPostProcessing(options);

exportFromGingko()
	.then(stringToJson)
	.then(postProcess)
	.then(dumpJsonToFiles)
	.then(function() {
		console.log('Done!');
	})
	.catch(showError);

// each of the steps implementations follow below //

function exportFromGingko() {
	console.log('Exporting tree from Gingko...');
	return gingkoExporter.exportTree(options.treeId, options.username, options.password);
}

function stringToJson(text) {
	console.log('Parsing result...');
	return JSON.parse(text);
}

function dumpJsonToFiles(jsonObject) {
	console.log('Dumping to files...');
	return jsonToFileExporter.dumpJson(jsonObject, options.outputDir);
}

function showError(error) {
	console.error(error);
}

// --------------------------------------------------------------------------
// command line processing
var commandLine = null;
function ensureCommandLine() {
	if (!commandLine) {
		commandLine = require('./command-line/command-line-processing');
	}
}

function parseCommandLineArguments() {
	ensureCommandLine();
	return commandLine.parse();
}

function validateCommandLineArguments(options) {
	ensureCommandLine();
	var errors = commandLine.validate(options);

	if (errors.length) {
		for (var i = 0; i < errors.length; i++) {
			console.error(errors[i]);
		}
		process.exit(1);
	}
}

function showCommandLineUsage() {
	ensureCommandLine();
	commandLine.showUsage();
	process.exit(0);
}

function postProcess(jsonObject) {
	return postProcessor.postProcess(jsonObject, options);
}