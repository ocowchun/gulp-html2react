'use strict';
var path = require('path');
var gutil = require('gulp-util');
var through = require('through2');
var react = require('react-tools');
var reactDomPragma = require('react-dom-pragma');

module.exports = function(options) {
	return through.obj(function(file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new gutil.PluginError('gulp-html2react', 'Streaming not supported'));
			return;
		}

		var str = file.contents.toString();
		var filePath = file.path;

		if (path.extname(filePath) === '.html') {
			//add require
			var re = /(?:\<\!\-\-([\S\s])*?)\-\-\>/gm;
			var comments = str.match(re);
			var requires = ['var React = require("react");'];
			var max=!!comments?comments.length:0;
			for (var i = 0 ;i < max; i++) {
				var comment = comments[i];
				requires.push(comment.replace('<!--', '').replace('-->', ''));
				str = str.replace(comment, '');
			}

			str = requires.join('\n') + '\nmodule.exports =function(){return (' + str + ');};';
			str = reactDomPragma(str);
			console.log(str)
		}

		try {
			file.contents = new Buffer(react.transform(str, options));
			file.path = gutil.replaceExtension(filePath, '.js');
			cb(null, file);
		} catch (err) {
			cb(new gutil.PluginError('gulp-html2react', err, {
				fileName: filePath
			}));
		}
	});
};