const gulp = require('gulp');
// requires gulp-sass plugin
const sass = require('gulp-sass');
// require browserSyn for live reloading
const browserSync = require('browser-sync').create();
// require uglify for minification and gulpIf to determine 
//  files to minify
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
// require cssnano to minify css file
const cssnano = require('gulp-cssnano');
// require gulp-imagemin to optimize images
const imagemin = require('gulp-imagemin');
// require gulp-cache to cache images
const cache = require('gulp-cache');
// require del to clean up files no more in use
const del = require('del');
// require run-sequence to determine how the tasks are run
const runSequence = require('run-sequence');



// compile scss to css using gulp-sass
gulp.task('sass', () =>  {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// watch all files in app/scss for changes
gulp.task('watch', ['browserSync', 'sass'], () => {
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML files change
  gulp.watch('app/*.html', browserSync.reload); 
});

// setup task for browserSyn live reloading
gulp.task('browserSync', () =>  {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// setup for css files minification
gulp.task('useref', () => {
  return gulp.src('app/*.html')
    .pipe(cssnano())
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', uglify()))
    .pipe(gulp.dest('dist'))
});

// setup for optimizing images
gulp.task('images',() => {
  return gulp.src('app/Assets/Images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin({
      // Setting interlaced to true
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// copy fonts to dist folder
gulp.task('fonts',() =>  {
  return gulp.src('app/Assets/Fonts/Proxima Nova Soft/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

// cleaning
gulp.task('clean', () => {
  return del.sync('dist').then((cb) => {
    return cache.clearAll(cb);
  });
})


gulp.task('clean:dist',() =>  {
  return del.sync('dist');
})

// Build Sequences
// ---------------
gulp.task('default', (callback) => {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})

gulp.task('build', (callback) => {
  runSequence('clean:dist', 
    ['sass', 'useref', 'images', 'fonts'],
    callback
  )
})

