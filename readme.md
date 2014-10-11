# gulp-html2react
> Compile html to React syntax.

Inspired by [gulp-react](https://github.com/sindresorhus/gulp-react/blob/master/index.js)

##Motivation
I don't like write html in js file,so i build the gulp.

## Install

```sh
$ npm install --save-dev gulp-html2react
```

## Usage

```js
var gulp = require('gulp');
var html2react = require('gulp-html2react');

gulp.task('react', function() {
	return gulp.src('app/javascripts/templates/*.html')
		//compile html to JavaScript in React syntax.
		.pipe(html2react())
		.pipe(gulp.dest('temp/javascripts/templates'));
});
```

##Custom Element
If you use custom element in html:
```html
<div>
	<HelloMessage name="John" />
</div>
```

You Must add require path about the custom element component:

```
<!-- var HelloMessage = require('.././components/hello_message'); -->
<div>
	<HelloMessage name="John" />
</div>
```

##License

MIT © [ocowchun](mailto:ocowchun@gmail.com)