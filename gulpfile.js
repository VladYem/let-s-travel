var gulp = require('gulp'), // щоб не писати кожен раз 'var', можна змінні через кому додавати.
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
naested = require('postcss-nested'),
cssImport = require('postcss-import'),
browserSync = require('browser-sync').create();

gulp.task('default', function() {
	console.log("Horray - you created a Gulp task.");
});

gulp.task('html', function() {
	console.log("Imagine somoething useful being done to your HTML here.");
});

gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/style.css')
	.pipe(postcss([cssImport, cssvars, naested, autoprefixer]))
	.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function() {

// auto reload "app" project
	browserSync.init({
		notify: false, //hide litle black, help pop up box, when tha page refresh automatically  
		server: {
			baseDir: "app"
		}
	});

// auto reload the page when we save html changes
	watch('./app/index.html', function() {
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});
});

//inject css
gulp.task('cssInject', /*dependency will run befor cssInject:*/['styles'], function() {
	gulp.src('./app/temp/styles/style.css')
		.pipe(browserSync.stream());
});

