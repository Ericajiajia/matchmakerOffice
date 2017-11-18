const gulp = require('gulp')
const fontSpider = require('gulp-font-spider')
// 压缩图片
const imagemin = require('gulp-imagemin')
const pngquant = require('imagemin-pngquant')
// 压缩css文件
const autoprefixer = require('gulp-autoprefixer')
const minifycss = require('gulp-minify-css')
// 压缩js文件
var jsmin = require('gulp-jsmin')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
// 不要使用uglify
// const uglify = require('gulp-uglify')

// 字蛛生效
gulp.task('fontspider', function () {
	gulp.src('./index.html')
    .pipe(fontSpider())
})
// 深度压缩图片
gulp.task('Imagemin', function () {
	gulp.src('./static/picture/*.*')
		.pipe(imagemin({
			optimizationLevel: 5,    //类型：Number  默认：3  取值范围：0-7（优化等级）
			progressive: true,       //类型：Boolean 默认：false 无损压缩jpg图片
			use: [pngquant()]        //使用pngquant深度压缩png图片的imagemin插件
		}))
		.pipe(gulp.dest('./static/pic'))
})
// 压缩css文件
gulp.task('miniCss', function () {
	gulp.src('./static/css/*.css')
		.pipe(concat('main.css'))
		.pipe(autoprefixer('last 2 versions', 'last 1 Chrome versions', 'Android >= 4.0', 'iOS 7', 'last 2 Explorer versions', 'last 3 Safari versions'))
		.pipe(rename({suffix: '.min'}))
		.pipe(minifycss())
		.pipe(gulp.dest('./static/css'))
})
// 压缩js文件
gulp.task('miniScript', function () {
	gulp.src('./static/js/*.js')
		.pipe(concat('main.js'))
		.pipe(jsmin())
		.pipe(rename({suffix: '.min'}))
  //	 .pipe(uglify({
  //           compress: true,//类型：Boolean 默认：true 是否完全压缩
  //           preserveComments: 'all' //保留所有注释
  //       }))
		.pipe(gulp.dest('./static/js'))
})
gulp.task('default', ['fontspider', 'Imagemin', 'miniCss', 'miniScript'])
