const gulp = require('gulp')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')
const nodemon = require('gulp-nodemon')
const tslint = require('gulp-tslint')
const sequence = require('gulp-sequence')

const tsProject = ts.createProject('tsconfig.json')

/**
 * 将 typescript 编译为 js
 */
gulp.task('js', function () {
    return tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('devDist'));
});

/**
 * tslint
 */
gulp.task('tslint', function () {
  return gulp.src('src/**/*.ts')
              .pipe(tslint({
                  configuration: 'tslint.json'
              }))
              .pipe(tslint.report({
                  emitError: true,
                  reportLimit: 0,
                  summarizeFailureOutput: false,
                  allowWarnings: false
              }))
});

/**
 * 监听文件变动，重新 tslint 和 编译 ts 文件，重启服务器
 */
gulp.task('watch', ['tslint', 'js'] function () {
    return nodemon({
        script: 'devDist/index.js',  // 服务的启动文件
        watch: 'src',    // 源代码目录
        tasks: ['nodemon-tasks'], // 在重启服务前需要执行的任务
        ext: 'ts', // 监听.ts结尾的文件 必须
        env: { // 设置环境
            'NODE_ENV': 'development'
        }
    });
});

/**
 * nodemon 重启服务之前需要执行的 gulp 任务
 * 如果 tslint 检查不通过 命令行抛出错误, 不会执行 js task, 即不会编译 ts 为 js, nodemon 还是错误之前的
 * 如果 tslint 检查通过 重新编译 ts 为 js , 重启服务
 */
gulp.task('nodemon-tasks', function (cb) {
    sequence('tslint')(function (err) {
      if (err) {
        cb()
      } else {
        sequence('js')(cb)
      }
    })
})

gulp.task('build', function (cb) {
    sequence('tslint', 'js')(cb)
})
