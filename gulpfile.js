var gulp = require('gulp'),

    //general plugins
    rename = require('gulp-rename'),
    argv = require('yargs').argv, // set environments
    gulpif = require('gulp-if'), // set environments
    gutil = require('gulp-util'), // better syntax error debug
    changed = require('gulp-changed'),
    cached = require('gulp-cached'),
    chalk = require('chalk'), // colors on console

    browserSync = require('browser-sync'), //reload css without refresh page

    // php stuff
    php2html = require("gulp-php2html"), // turn .php into .html
    htmlmin = require('gulp-htmlmin'), // minify html

    // scss stuff
    sass = require('gulp-sass'), //scss to css
    cleanCSS = require('gulp-clean-css'), //css min
    autoprefixer = require('gulp-autoprefixer'), // bye bye webkit-
    sassInheritance = require('gulp-sass-multi-inheritance'), // watch scss partials

    // javascript plugins
    uglify = require('gulp-uglify'), // minify js
    stripDebug = require('gulp-strip-debug'), // byebye console logs
    include = require("gulp-include"), //concat js
    babel = require('gulp-babel'); //es6 to es5


// scss and js folders
var folderScripts = 'assets/scripts',
    folderStyles = 'assets/styles',
    srcScss = [folderStyles+'/**/*.scss', '!'+folderStyles+'/**/_*.scss'],
    srcJs = [folderScripts+'/**/*.js', '!'+folderScripts+'/**/_*.js', '!'+folderScripts+'/**/*.min.js'];


// check if it's production or development environment
function logEnv() {
    var chWarn = chalk.bold.red,
        chGood = chalk.bold.green,
        envv = argv.production ? chGood('production') : chWarn('development');
    console.log('environment: ' + envv);
}


// ------------ tasks ------------- //

gulp.task('scripts', function(){
    console.log('start task scripts');
    gulp.src(srcJs)
        .pipe(include())
        .pipe(babel({
            presets: ["es2015-script"],
            compact: false //use uglify
        }))
        .pipe(gulpif(argv.production, stripDebug()))
        .pipe(gulpif(argv.production,
            uglify().on('error', gutil.log)
        ))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest( function(file) { return file.base; } ));
    logEnv();
});


gulp.task('scss', function(){
    console.log('start task scss');
    gulp.src(srcScss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 6', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: true
        }))
        .pipe(gulpif(argv.production,
            cleanCSS({
                compatibility: 'ie9'
            })
        ))
        .pipe(gulpif(argv.development,
            cleanCSS({
                compatibility: 'ie9',
                advanced: false //much faster
            })
        ))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest( function(file) { return file.base; } ))
        .pipe(browserSync.stream());
    logEnv();
});

gulp.task('scssPartials', function() {
    // watch for scss partials when they are changed to change their parent
    return gulp.src('assets/**/*.scss')
        // filter out unchanged scss files, only works when watching
        .pipe(gulpif(global.isWatching, cached(srcScss)))
        // find files that depend on the files that have changed
        .pipe(sassInheritance({dir: 'assets'}).on('error', gutil.log));
});


gulp.task('gen-html', function(){
    gulp.src(['**/*.php','!**/_*.php'])
    .pipe(php2html())
    .pipe(gulpif(argv.production,
        htmlmin({collapseWhitespace: true})
    ))
    .on('error', console.error)
    .pipe(gulp.dest(""));
});


gulp.task('browser-sync', function() {
    console.log('chega aqui');
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        open: false,
        ghostMode: false
    });

    gulp.watch(folderStyles+"/**/*.scss", ['scss']);
    gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);
});

gulp.task('setWatch', function() {
    global.isWatching = true;
});

gulp.task('watch', ['setWatch', 'scssPartials', 'browser-sync'], function(){
    gulp.watch([
            folderScripts+'/**/*.js',
            '!'+folderScripts+'/**/*.min.js'
        ], { usePolling: true }, ['scripts']);
    gulp.watch(['**/*.php'], ['gen-html']);
});



gulp.task('build', ['scripts', 'scss', 'gen-html']);


gulp.task('default', function() {
    var chTitle = chalk.bold.blue;
    var chBold = chalk.bold;
    console.log(chBold('Gulp tasks available')+"\n"
        +chTitle('$ gulp watch')+"\n"
            +"  watch .js and .scss with browsersync and convert .php to .html.\n"
            +"  Use the flag '--production' to minify the files \n"

        +"\n"+chTitle('$ gulp build')+"\n"
            +"  Compile .scss, .js and .php \n"
            +"  Use the flag '--production' to minify the files."
    );
});
