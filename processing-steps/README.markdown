All files in this directory will have the following pattern:


```javascript
'use strict';

module.exports = functionName;

function functionName(content, options) {
	// process and modify content
	return modifiedContent;
}
```

As such, all of these post-processing tasks will operate directly on the content
and return a new version of it, which should be a `string`.

- `content` refers to the actual string content of each of the tree nodes.
- `options` refers to the command line options passed in, as a parsed object.