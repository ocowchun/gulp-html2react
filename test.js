'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var react2html = require('./');

it('should precompile React templates', function(cb) {
	var stream = react2html();

	stream.on('data', function(file) {
		var expect_content = '/** @jsx React.DOM */\nvar React = require("react");\nmodule.exports =function(){return (React.DOM.div(null, "foo"));};'
		var file_content=file.contents.toString();
		
		assert.equal(file.relative, 'foo.js');
		assert.equal(file_content, expect_content);
		cb();
	});

	stream.write(new gutil.File({
		path: 'foo.html',
		contents: new Buffer('<div>foo</div>')
	}));
});

it('should precompile React templates with require comment', function(cb) {
	var stream = react2html();

	stream.on('data', function(file) {
		var expect_content = '/** @jsx React.DOM */\nvar React = require("react");\n var card = require("./card"); \nmodule.exports =function(){return (React.DOM.p(null, "foo"));};'
		var file_content=file.contents.toString();
		
		assert.equal(file.relative, 'foo.js');
		assert.equal(file_content, expect_content);
		cb();
	});

	stream.write(new gutil.File({
		path: 'foo.html',
		contents: new Buffer('<!-- var card = require("./card"); --><p>foo</p>')
	}));
});