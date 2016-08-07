'use strict';

module.exports = generateGitbookMetadataFiles;

// depends on: ./determine-file-names to have run first
// depends on: ./determine-level-numbers to have run first

var Q = require('q');
var forEachTreeNode = require('./util/for-each-tree-node');
var getNewItemLevelItemNumber = require('./util/get-new-item-level-item-number');
var generateMarkdownLinkForFileName = require('./util/generate-markdown-link-for-filename');

var fs = require('fs');
var qWriteFile = Q.nfbind(fs.writeFile);

function generateGitbookMetadataFiles(documentTree, options) {
  return Q.all([
    generateGitbookSummary(documentTree, options),
    generateGitbookBookJson(options),
    generateGitbookReadme(documentTree, options)
  ]);
}

function generateGitbookReadme(documentTree, options) {
  //TODO pick a file to use as readme from the document tree, based on an option

  //TODO abort search once first element was found
  var firstElementContent = null;
  forEachTreeNode(documentTree, function(node) {
    if (!firstElementContent) {
      firstElementContent = node.content;
    }
  });

  console.log("Generating GitBook's README.md file");
  return qWriteFile(options.rootOutput + '/README.md', firstElementContent);
}

function generateGitbookBookJson(options) {
  var deferred = Q.defer();

  var bookJsonLocation = options.bookJsonLocation || options.rootOutput;
  var jsonOutput = {
    title: options.bookTitle,
    description: options.bookDescription,
    author: options.bookAuthor,
    language: options.bookLanguage,
    direction: options.bookDirection
  };

  console.log("Generating GitBook's book.json file");
  return qWriteFile(options.rootOutput + '/book.json', JSON.stringify(jsonOutput));
}

function generateGitbookSummary(documentTree, options) {
	var summaryFileContents = "# Summary\n\n";
  var summaryFileName = options.rootOutput + '/SUMMARY.md';

	forEachTreeNode(documentTree, function(treeNode) {
		if (!treeNode.content) return;

		console.log('Adding content to GitBook summary from ' + treeNode.fileName);
		var indentation = treeNode.nestingLevel * 4;
		var markdownLink = generateMarkdownLinkForFileName(treeNode.fileName, summaryFileName);
		summaryFileContents += ' '.repeat(indentation) + '* ' + markdownLink + '\n';
	});

	var itemNumber = getNewItemLevelItemNumber(documentTree);

	documentTree.push({
		itemNumber: itemNumber,
		fileName: summaryFileName,
		content: summaryFileContents
	});
}

// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
if (!String.prototype.repeat) {
  String.prototype.repeat = function(count) {
    'use strict';
    if (this == null) {
      throw new TypeError('can\'t convert ' + this + ' to object');
    }
    var str = '' + this;
    count = +count;
    if (count != count) {
      count = 0;
    }
    if (count < 0) {
      throw new RangeError('repeat count must be non-negative');
    }
    if (count == Infinity) {
      throw new RangeError('repeat count must be less than infinity');
    }
    count = Math.floor(count);
    if (str.length == 0 || count == 0) {
      return '';
    }
    // Ensuring count is a 31-bit integer allows us to heavily optimize the
    // main part. But anyway, most current (August 2014) browsers can't handle
    // strings 1 << 28 chars or longer, so:
    if (str.length * count >= 1 << 28) {
      throw new RangeError('repeat count must not overflow maximum string size');
    }
    var rpt = '';
    for (;;) {
      if ((count & 1) == 1) {
        rpt += str;
      }
      count >>>= 1;
      if (count == 0) {
        break;
      }
      str += str;
    }
    // Could we try:
    // return Array(count + 1).join(this);
    return rpt;
  }
}