'use strict';

module.exports = stripTags;

var TAG_REGEX = /#\S+/g;

function stripTags(content/*, options*/) {
	console.log('Stripping tags from ' + content.split('\n')[0]);
	return content.replace(TAG_REGEX, '');
}