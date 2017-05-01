var gulp = require('gulp'),

    // general plugins
    rename = require('gulp-rename'),
    argv = require('yargs').argv, // useful to create ENV (prod vs dev)
    gulpif = require('gulp-if'), // useful to create ENV (prod vs dev)
    gutil = require('gulp-util'), // some debug logs
    cached = require('gulp-cached'),
    stripDebug = require('gulp-strip-debug'), // byebye console.logs
    chalk = require('chalk'), // some colors on terminal

    php2html = require('gulp-php2html'),
    htmlmin = require('gulp-htmlmin'),

    browserSync = require('browser-sync'), // i'm not sure how this and connect-php works ...

    // scss stuff
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    sassInheritance = require('gulp-sass-multi-inheritance'), // watch partials

    // javascript plugins
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
    babel = require('gulp-babel');

var folderScripts = 'src/scripts',
    folderStyles = 'src/styles',
    srcScss = [ folderStyles+'/**/*.scss', '!'+folderStyles+'/**/_*.scss'],
    srcJs = [folderScripts+'/**/*.js', '!'+folderScripts+'/**/_*.js', '!'+folderScripts+'/**/*.min.js'];


function logEnv() {
    var chWarn = chalk.bold.red,
        chGood = chalk.bold.green,
        envv = argv.production ? chGood('production') : chWarn('development');

    console.log('environment: ' + envv);
}


gulp.task('default', function(){
    var chTitle = chalk.bold.blue,
        chBold = chalk.bold;
    console.log(chBold('Gulp tasks available')+'\n'
        +chTitle('gulp start')+'\n'
            +' watch changes on src/*js | src/*.css and apply scripts and stylestask.\n'
            +' watch changes on index.php and compile to index.html \n'
            +' Use "--production" to work in production mode. \n'

        +'\n'+chTitle('gulp build')+'\n'
            +' run scripts, styles and html tasks and minify them.\n'

        +'\n'+chTitle('gulp sprite')+'\n'
            +' mount a sprite with svg/*.svg to be used with <use> tag.\n'

        +'\n'+chTitle('read /gulpfile.js to see other tasks')+'\n'
    );
});

gulp.task('start', ['setWatch', 'scssPartials', 'browser-sync']);

gulp.task('build', ['run-prod', 'scripts', 'scss', 'gen-html']);

gulp.task('run-prod', function() {
    argv.production = true;
});


gulp.task('scripts', function(){
    console.log('start task scripts');
    gulp.src([srcJs])
        .pipe(include())
        .pipe(babel({
            presets: ['es2015-script'],
            compact: false // use uglify
        }))
        .pipe(gulpif(argv.production, stripDebug()))
        .pipe(gulpif(argv.production,
            uglify().on('error', gutil.log)
        ))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest( function(file) { return file.base; } ))
        .pipe(browserSync.stream());
    logEnv();
});


gulp.task('scss', function(){
    console.log('start task scss');
    gulp.src(srcScss)
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            browsers: ['last 2 version'],
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
                advanced: false // much faster comp.
            })
        ))
        .pipe(gulpif(global.isWatching, cached('cachedPlace')))
        .pipe(gulp.dest( function(file) { return file.base; } ))
        .pipe(browserSync.stream());
    logEnv();
});

gulp.task('scssPartials', function() {
    // watch for partials when they are changed to change their parent.
    return gulp.src('**/*.scss')
        .pipe(gulpif(global.isWatching, cached(srcScss))) // filter out unchanged scss files, only works when watching
        .pipe(sassInheritance({dir: 'src'}).on('error', gutil.log)); // find files that depend on the files that have changed
});


gulp.task('gen-html', function(){
    gulp.src(['**/*.php','!**/_*.php'])
        .pipe(php2html())
        .pipe(gulpif(argv.production,
            htmlmin({collapseWhitespace: true})
        ))
        .on('error', console.error)
        .pipe(gulp.dest(''));
    logEnv();
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        open: false,
        ghostMode: false
    });

    gulp.watch(folderScripts+'/**/*.js', ['scripts']);
    gulp.watch(folderStyles+'/**/*.scss', ['scss']);
    gulp.watch(['**/*.php'], ['gen-html']);
    gulp.watch(['index.html']).on('change', browserSync.reload);
});

gulp.task('setWatch', function() {
    global.isWatching = true;
});
