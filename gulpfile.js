var gulp = require('gulp');

// 引入组件
var less = require('gulp-less'),            // less
    minifycss = require('gulp-minify-css'), // CSS压缩
    rename = require('gulp-rename'),        // 重命名
    autoprefixer = require('gulp-autoprefixer'),//自动前缀
    jshint = require('gulp-jshint'),           //代码走查
    uglify = require('gulp-uglify'),           // js压缩
    imagemin = require('gulp-imagemin'),       //图片压缩
    cache = require('gulp-cache'),       //图片压缩
    notify = require('gulp-notify'),        // 消息
    clean = require('gulp-clean');          //清空文件夹

gulp.task('default',['clean'], function() {
  // 将你的默认的任务代码放在这
  return gulp.start('minifycss','uglifyjs','imagesmin');
});

//清理文档
gulp.task('clean', function() {  
  return gulp.src(['./js/scripts/**/*.min.js', './css/*.min.css','dist'], {read: false})
    .pipe(clean())
    .pipe(notify({ message: 'Clean task complete' }));
});

//图片压缩
gulp.task('imagesmin', function() {  
  return gulp.src('./css/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('./dist/assets/img'))
    .pipe(notify({ message: 'Images task complete' }));
});

//js代码检测
gulp.task('jshint', function() {  
  return gulp.src('./js/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(notify({ message: 'jshint task complete' }));
});

//css解析压缩
gulp.task('minifycss', function(){
  return gulp.src('./css/style.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/assets/css'))
    .pipe(notify({ message: 'Minifycss task complete' }));
});

//js压缩
gulp.task('uglifyjs', function() {  
  return gulp.src('./js/scripts/**/*.js')
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/assets/js'))
    .pipe(notify({ message: 'Uglifyjs task complete' }));

});