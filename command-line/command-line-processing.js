module.exports = {
	parse: parse,
	validate: validate,
	showUsage: showUsage
};

var PostProcessingOptionsDefinition = require('./post-processing-options-definition');
var commandLineArguments = require('command-line-args');
var cli = commandLineArguments([
	{ 
		name: 'treeId',
		alias: 't',
		type: String,
		description: 'Gingko tree ID to export.'
	}, {
		name: 'outputDir',
		alias: 'o',
		type: String,
		typeLabel: 'dir',
		description: 'Output directory for markdown files.'
	}, {
		name: 'username',
		alias: 'u',
		type: String,
		description: 'Gingko username.'
	}, {
		name: 'password',
		alias: 'p',
		type: String,
		description: 'Gingko password.'
	}, {
		name: 'postProcessing',
		type: PostProcessingOptionsDefinition,
		description: 'Post processing option names to apply.',
		multiple: true
	}, {
		name: 'help',
		alias: 'h',
		type: Boolean,
		description: 'Shows this help.'
	}
]);

function parse() {
	return cli.parse();
}

function validate(options) {
	var errors = [];
	if (!options.treeId) errors.push('--treeId or -t is required');
	if (!options.outputDir) errors.push('--outputDir or -o is required');
	if (!options.username) errors.push('--username or -u is required');
	if (!options.password) errors.push('--password or -p is required');

	return errors;
}

function showUsage() {
	console.log(cli.getUsage());
}