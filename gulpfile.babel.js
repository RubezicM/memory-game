
import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import sourceMaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import named from 'vinyl-named';
import del from 'del';
import webpack from 'webpack-stream';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import replace from 'gulp-replace';
import info from './package';


const server = browserSync.create();
sass.compiler = require('node-sass');


// check if in production or not
const PRODUCTION = yargs.argv.prod;


const paths = {
    styles: {
        src: 'src/assets/sass/main.scss',
        dest: 'dist/assets/css'
    },
    images: {
        src: 'src/assets/images/**/*.{jpg,png,jpeg,svg,gif}',
        dest: 'dist/assets/images'
    },
    scripts: {
        src:['src/assets/scripts/main.js'],
        dest: 'dist/assets/scripts'
    },
    other: {
        src: ['src/assets/**/*','!src/assets/{images,scripts,sass}','!src/assets/{sass,images,scripts}/**/*'],
        dest: ['dist/assets']
    },
    package: {
        src: ['**/*','!.vscode','!node_modules{,/**}','!packaged{,/**}','!src{,/**}','!.babelrc','!.gitignore','!gulpfile.babel.js','!package.json','!package-lock.json'],
        dest: 'packaged'
    }
};


export const serve = (done) => {
    server.init({
        server: {
        baseDir: "./",
        index:'index.html'
        },
        port: 3000
    });
    done();
};


export const reload = (done) => {
    server.reload();
    done();
};


export const clean = () => del(['dist']);


export const scripts = () => {
    return gulp.src(paths.scripts.src)
        .pipe(gulpif(!PRODUCTION,sourceMaps.init()))
        .pipe(named())
        .pipe(webpack({
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'] //or ['babel-preset-env']
                            }
                        }
                    }
                ]
            },
            output: {
                filename: '[name].js'
            },
            externals: {
                jquery: 'jQuery'
            },
            devtool: !PRODUCTION ? 'inline-source-map' : false,
            mode: PRODUCTION ? 'production' : 'development'
        }))
        .pipe(gulpif(!PRODUCTION,sourceMaps.write()))
        .pipe(gulp.dest(paths.scripts.dest))
};


export const styles = () => {
    return gulp.src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION,sourceMaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif(PRODUCTION,cleanCss({compatibility:'ie8'})))
        .pipe(postcss([autoprefixer()]))
        .pipe(gulpif(!PRODUCTION,sourceMaps.write()))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream())
};


export const images = () => {
    return gulp.src(paths.images.src)
        .pipe(gulpif(PRODUCTION,imagemin()))
        .pipe(gulp.dest(paths.images.dest))
};


export const copy = () => {
    return gulp.src(paths.other.src)
        .pipe(gulp.dest(paths.other.dest))
};


export const compress = () => {
    return gulp.src(paths.package.src)
        //.pipe(replace('_themename', info.name))
        .pipe(zip(`${info.name}.zip`))
        .pipe(gulp.dest(paths.package.dest))
};


export const watch = () => {
    gulp.watch('**/*php',reload);
    gulp.watch('src/assets/sass/**/*.scss', styles);
    gulp.watch('src/assets/scripts/**/*.js',gulp.series(scripts,reload));
    gulp.watch(paths.images.src, gulp.series(images,reload));
    gulp.watch(paths.other.src, gulp.series(copy,reload));
};


export const dev = gulp.series(clean, gulp.parallel(styles,scripts,images,copy),serve,watch);
export const build = gulp.series(clean, gulp.parallel(styles,scripts,images,copy));
export const bundle = gulp.series(build,compress);

export default dev;