/**
 * Require.
 */

var gulp         = require('gulp')
var sass         = require('gulp-sass')
// var sass         = require('gulp-dart-sass') // has slower compliation times.
var sourcemaps   = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var bulkSass     = require('gulp-sass-bulk-import')
var watch        = require('gulp-watch')
var shell        = require('shelljs')
var fs           = require('fs')

/**
 * Vars.
 */

var rootDir = __dirname
var webDir  = rootDir + '/web'
var input   = rootDir + '/src/sass/**/*.scss'
var output  = webDir  + '/assets/css'

/**
 * sass options.
 */

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
}

/**
 * sass.
 */

gulp.task('sass', function () {
    return gulp
        .src(input)
        .pipe(bulkSass())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(gulp.dest(output))
})

/**
 * auto-prefixer options.
 */

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
}

/**
 * gulpwatch.
 */

gulp.task('gulpwatch', function () {
    return watch(input, function (event) {

        /**
         * 
         */

        console.log('[gulpwatch] File ' + event.path + ' was ' + event.event + ', running tasks...')

        /**
         * 
         */

        gulp.start('sass')
        
    })
})

/**
 * prod.
 */

gulp.task('prod', [], function () {
    return gulp
        .src(input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest(output))
})

/**
 * run-browsersync-static.
 */

gulp.task('run-browsersync-static', [], function() {

    /**
     * 
     */

    var bsCommand = 'cd '
    bsCommand     += webDir
    bsCommand     += " && browser-sync start --server '.' --files 'assets/css/*.css'"

    /**
     * 
     */

    var command = `osascript -e 'tell application "Terminal" to do script "` + bsCommand + `"'`

    /**
     * 
     */

    shell.exec(command)

})

/**
 * propagate-index-header-and-footer-to-other-pages.
 */

gulp.task('propagate-index-header-and-footer-to-other-pages', [], function() {

    /**
     * 
     */

    var headerRegEx = /<!DOCTYPE html>(.|\n)*?<\/header>/g
    var titleRegEx  = /<title>(.|\n)*?<\/title>/g
    var footerRegEx = /<footer(.|)*?>(.|\n)*?<\/html>/g

    /**
     * 
     */

    var pathToIndexFile = webDir + '/index.html'

    /**
     * 
     */

    var otherFiles = [
        'contact-sales-thankyou.html',
        'contact-sales.html',
        'contact-support.html',
        'contact.html',
        'deploy.html', 
        'design.html', 
        'engine.html', 
        'governance.html',
        'index.html',
        'ingest-and-translate.html',
        'it-security.html',
        'monitor.html',
        'our-community.html'
    ]

    /**
     * 
     */

    const indexFileContents = fs.readFileSync(pathToIndexFile, 'utf-8')

    /**
     * 
     */

    var indexHeaderContent = indexFileContents.match(headerRegEx)[0]
    var indexTitleTag      = indexFileContents.match(titleRegEx)[0]
    var indexFooterContent = indexFileContents.match(footerRegEx)[0]

    /**
     * 
     */

    otherFiles.forEach(filename => {

        /**
         * 
         */

        var pathToFile = webDir + '/' + filename

        /**
         * 
         */

        fs.readFile(pathToFile, 'utf8', (err, fileContents) => {
            
            /**
             * 
             */

            var titleTagFromFile = fileContents.match(titleRegEx)[0]

            /**
             * 
             */

            indexHeaderContent = indexHeaderContent.replace(titleRegEx, titleTagFromFile)

            /**
             * 
             */

            var replacedContent = fileContents.replace(headerRegEx, (match, replacePath) => { return indexHeaderContent })
            replacedContent     = replacedContent.replace(footerRegEx, (match, replacePath) => { return indexFooterContent })

            /**
             * 
             */

            fs.writeFileSync(pathToFile, replacedContent)

        })

    })

})

/**
 * default.
 */

gulp.task('default', ['sass', 'gulpwatch'])
