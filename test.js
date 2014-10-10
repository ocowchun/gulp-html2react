'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react2html = require('./');

it('should precompile React templates', function(cb) {
	var stream = react2html();

	stream.on('data', function (file) {
		assert.equal(file.relative, 'foo.js');
		cb();
	});

	stream.write(new gutil.File({
		path: 'foo.html',
		contents: new Buffer('<div>foo</div>')
	}));
});