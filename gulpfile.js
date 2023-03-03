const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));      // importação dos pacotes 
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function imgCompress() {
    return gulp.src=('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'));
}

function comprimeJs() {
    return gulp.src('./source/scripts/*.js')
        .pipe(uglify())
        .pipe(obfuscate())
        .pipe(gulp.dest('./build/scripts'))
}


function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function funcaoPadrao(callback) {
    setTimeout(function() {
        console.log('Executando via Gulp');
        callback();
    }, 2000);
}

function dizOi(callback) {
    console.log('Olá Gulp');
    dizTchau();                 //chamando uma tarefa privada, dentro de uma pública. (quando há necessidade de exportação)
    callback();
}

                                //           tarefa privada, não é necessário exportar! podem ser chamadas dentro e outras tarefas.
function dizTchau() {
    console.log('Tchau Gulp');
}

exports.default = gulp.parallel(funcaoPadrao, dizOi);
exports.dizOi = dizOi;

//--------------------
// As tarefas podem ser executadas em série
// importa-se o pacote "  const gulp = require('gulp');  " e export padrão é criado: exports.default = gulp.series(função1,função2..);

//---------------------
// Ou as tarefas podem ser executadas em paralelo.
// utiliza-se a função parallel:
// exports.default = gulp.parallel(função1, função2...);

//Há ganho de performance ao utilizar o gulp de forma paralela.

exports.sass = compilaSass;
exports.watch = function() {
    gulp.watch('./source/styles/*.scss', { ignoreInitial:false }, gulp.series(compilaSass));
}

exports.comprimeJs = comprimeJs;
exports.images = imgCompress;