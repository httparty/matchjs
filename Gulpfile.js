var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var clean = require('gulp-clean');
var protractor = require('gulp-protractor').protractor;
var karma = require('gulp-karma');

var paths = {
	scripts: ['client/app/**/*.js', 'server/**/*.js'],
  //OTHER PATHS TBD:
 // libs: ['scripts/libs/jquery/dist/jquery.js', 'scripts/libs/underscore/underscore.js', 'scripts/backbone/backbone.js'],
	styles: ['client/assets/styles/**/*.css'],
	html: ['client/app/**/*.html','client/index.html']
 // images: ['images/**/*.png'],
 // extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};

//delete the contents of dist folder
gulp.task('clean', function() {
  return gulp.src('dist/', {
    read: false
  })
    .pipe(clean());
});

/*************************************************************
Server side unit tests with Mocha + Chai
**************************************************************/

gulp.task('test', function(){
  gulp.src('./server/test/unit/*.js')
    .pipe(mocha({reporter: 'nyan'}));
});

/*************************************************************
Client side unit tests with Karma + Mocha + Chai
**************************************************************/

gulp.task('karma', function(done) {
  gulp.src('./client/test/unit/*.js')
      .pipe(karma({
        configFile: './client/test/karma.conf.js',
        action: 'run'
      }))
      .on('error', function(err) {
        // Make sure failed tests cause gulp to exit non-zero
        // console.log(err);
        this.emit('end'); //instead of erroring the stream, end it
      });
});

/*************************************************************
End to end testing with Protractor
**************************************************************/

gulp.task('e2e', function(done) {
  gulp.src(['./client/test/e2e/*.js'])
    .pipe(protractor({
      configFile: 'client/test/protractor.conf.js',
    }))
    .on('error', function(error) { throw error; });
});

//pipe all scripts within the src/scripts folder to the jshint object, and outputs errors to the console
gulp.task('jshint', function() {
	gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
		// .pipe(gulp.dest('dist/')); //this creates the dist folder with manipulated files dropped in. I don't think we're ready for this yet :).
});

gulp.task('default', ['jshint','test']);

gulp.task('test-suite', ['test','karma']);

//------------We'll need these later, please leave them here.

// gulp.task('imagemin', function() {
// 	var imgSrc = './src/images/**/*';
// 	var imgDst = './dist/images';
// 	gulp.src(imgSrc)
// 		.pipe(changed(imgDst))
// 		.pipe(imagemin())
// 		.pipe(gulp.dest(...))
// });

// gulp.task('htmlpage', function() {
// 	var htmlSrc = './src/*.html',
// 	htmlDst = './build';
// 	gulp.src(htmlSrc)
// 		.pipe(changed(htmlDst))
// 		.pipe(minifyHTML())
// 		.pipe(gulp.dest(htmlDst));
// });
//-----------------------------------------------------------
