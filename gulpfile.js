var gulp = require('gulp'),
    path = require('path'),
    util = require('gulp-util'),
    stylus = require('gulp-stylus'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    run = require('gulp-run'),
    es = require('event-stream'),
    connect = require('gulp-connect');

/*GENERAL CONFIGS */
CONFIGS = {
    context: 'prod',
    app: 'temwhats.com',
    version: '1.0',
    warnings: {
        successful: true
    },
    msgs: {
        dev: '##### You\'re in DEV context. #####',
        prod: '##### You\'re in PROD context. #####',
        type: {
            warn: '➜ WARNING: '
        }
    }
};

/*GENERAL SETTINGS */
SETTINGS = {
    app: {
        name: CONFIGS.app,
        version: CONFIGS.version
    },
    config: {
        notifier: './node_modules/terminal-notifier/terminal-notifier.app/Contents/MacOS/terminal-notifier',
        warnings: {
            successful: CONFIGS.warnings.successful
        },
        styles: {
            compress: true
        },
        scripts: {
            presets: 'es2015',
            debug: false
        },
        images: {
            quality: '90-100',
            progressive: true
        }
    },
    context: CONFIGS.context,
    root: './',
    path: {
        static: 'static/',
        dist: 'dist/',
        minified: 'min/',
        images: 'images/',
        assets: 'assets/',
        sprites: 'sprites/',
        scripts: 'js/',
        styles: 'css/'
    },
    msgs: {
        warning: {
            prod: CONFIGS.msgs.type.warn + CONFIGS.msgs.prod,
            dev: CONFIGS.msgs.type.warn + CONFIGS.msgs.dev
        }
    }
};

/*GENERAL PATHS */
var base = {
    src: path.join(SETTINGS.root, SETTINGS.path['static']),
    dist: path.join(SETTINGS.root, SETTINGS.path['static'])
},
PATHS = {
    root: {
        src: SETTINGS.root
    },
    styles: {
        src: path.join(base.src, SETTINGS.path.styles, SETTINGS.app.version, SETTINGS.path.assets),
        dist: path.join(base.dist, SETTINGS.path.styles, SETTINGS.app.version, SETTINGS.path.minified)
    },
    scripts: {
        src: path.join(base.src, SETTINGS.path.scripts, SETTINGS.app.version, SETTINGS.path.assets),
        dist: path.join(base.dist, SETTINGS.path.scripts, SETTINGS.app.version, SETTINGS.path.minified)
    },
    images: {
        src: path.join(base.src, SETTINGS.path.images, SETTINGS.path.assets),
        dist: path.join(base.dist, SETTINGS.path.images, SETTINGS.path.dist)
    },
    sprites: {
        src: path.join(base.src, SETTINGS.path.images, SETTINGS.path.sprites, '*.*'),
        src: path.join(base.src, SETTINGS.path.images, SETTINGS.path.sprites, SETTINGS.path.dist)
    }
};

/*DEV CONDITION */
if (util.env.dev) {
    SETTINGS.context = 'dev';
    SETTINGS.config.styles.compress = false;
    SETTINGS.config.scripts.debug = true;
    SETTINGS.config.warnings.successful = false;
    uglify = util.noop;
} else {
    sourcemaps.init = util.noop;
    sourcemaps.write = util.noop;
}

/*WEBSERVER*/
gulp.task('webserver', function() {
  connect.server({
    root: '.',
    port: 3000,
    livereload: true
  });
});

/*FUNCTIONS*/
function terminal_notifier(name, title, subtitle, msg){
    run(SETTINGS.config.notifier + ' \
        -title "' + title + '" -message "' + msg.toString() + '" \
        -subtitle "' + subtitle + '" -activate "com.apple.terminal" \
        -group "' + name + '" -remove "' + name + '"').exec()
        .on('error', function(){this.emit('end')});
}


/*STYLUS */
gulp.task('stylus', function() {
    gulp.src(path.join(PATHS.styles.src, '**/*.styl'))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: SETTINGS.config.styles.compress
        }))
        .on('error', function(err){
            util.log(
                util.colors.cyan("Stylus error:"), 
                util.colors.red(err.message)
            );
            terminal_notifier('stylus', '❌ Stylus', 'Error', err.toString());
            this.emit('end');
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PATHS.styles.dist));

    if(SETTINGS.config.warnings.successful){
        terminal_notifier('stylus', '✅ Stylus', '', 'Compiled');
    }
});

/*UGLIFY-JS*/
gulp.task('uglify-js', function() {
    gulp.src(path.join(PATHS.scripts.src, '**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(gulp.dest(PATHS.scripts.dist))
    
    if(SETTINGS.config.warnings.successful){
        terminal_notifier('uglify', '✅ Uglify - Js', '', 'Compiled');
    }
});

/*GULP SERVE */
gulp.task('serve', ['webserver', 'stylus', 'uglify-js'], function() {
    gulp.watch(path.join(PATHS.styles.src, '**/*.styl'), ['stylus']);
    gulp.watch(path.join(PATHS.scripts.src, '**/*.js'), ['uglify-js']);
});


/*GULP AVAILABLE TASKS */
gulp.task('build', ['stylus', 'uglify-js']);
gulp.task('run', ['serve']);
gulp.task('default', ['run']);