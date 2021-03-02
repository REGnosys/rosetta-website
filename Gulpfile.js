/**
 * Require.
 */

const { src, dest, watch, series } = require('gulp')
const sass = require('gulp-sass')
const bulkSass = require('gulp-sass-bulk-importer')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')

/**
 * Vars.
 */

const rootDir = __dirname
const webDir  = rootDir + '/web'
const input   = rootDir + '/src/sass/**/*.scss'
const output  = webDir  + '/assets/css'

/**
 * sass options.
 */

const sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
}

/**
 * compileSass.
 */

function compileSass(done) {
    
    /**
     * 
     */

    src(input)
        .pipe(bulkSass())
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer())
        .pipe(dest(output))

    /**
     * 
     */

    done()

}

/**
 * watchSass.
 */

function watchSass() {
    watch(input, compileSass)
}

/**
 * Exports.
 */

exports.compileSass = compileSass
exports.watchSass = watchSass

/**
 * 
 */

exports.default = series(compileSass)