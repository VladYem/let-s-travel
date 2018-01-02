var gulp = require('gulp'), // щоб не писати кожен раз 'var', можна змінні через кому додавати.
watch = require('gulp-watch'),
browserSync = require('browser-sync').create();;

gulp.task('watch', function() {

// auto reload "app project"
	browserSync.init({
		notify: false, //hide litle block, help pop up box, when the page refresh automatically  
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
