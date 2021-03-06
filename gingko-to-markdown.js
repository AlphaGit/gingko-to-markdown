'use strict';

var options = parseCommandLineArguments();

if (options.help) {
	showCommandLineUsage();
	process.exit(0);
}

validateCommandLineArguments(options);

var gingkoExporter = require('./exporter/gingko-exporter');
var processingSteps = require('./processing-steps');

exportFromGingko()
	.then(stringToJson)
	.then(function(documentTree) {
		return processingSteps.processContent(documentTree, options);
	})
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
	return commandLine.parseAndSetDefaults();
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