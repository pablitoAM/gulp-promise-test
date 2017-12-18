const gulp              = require('gulp');
const streamToPromise   = require('stream-to-promise');
const transform         = require('./transform');
const merge             = require('./merge');

function promise(){
    return new Promise((resolve, reject) => {
        console.log('Checking for inputs...');
        setTimeout(function(){
            let result = ['1','5','6', '7', '8'];
            console.log(`Found ${result.length} inputs.`);
            resolve(result);
        }, 2000);
    });
}

gulp.task('promise', function(){
    return promise()
    .then(val => console.log('Val: ', val))
    .catch(console.error);
});

gulp.task('stream', function(){
    let val     = ['1', '4', '3'];
    let result  = [];

    gulp.src('data/*.js')
        .pipe(transform())
        .pipe(merge(val))
        .on('data', (chunk) => result.push(chunk))
        .on('end', function(){
            console.log('Transformed and Filtered: ', result);
        });

});

gulp.task('all', function(){

    let result = [];
    return promise()
    .then(val => {
        return streamToPromise(
            gulp.src('data/*.js')
                .pipe(transform())
                .pipe(merge(val))
                .on('data', (chunk) => result.push(chunk))
                .on('end', function(){
                    console.log('Transformed and Filtered: ', result);
                })
        );
    })
    .then(result => {
        console.log('Final: ', result);
        return result;
    }).catch(console.error);
})