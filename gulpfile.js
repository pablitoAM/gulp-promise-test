const gulp      = require('gulp');
const fs        = require('fs');
const transform = require('./transform');
const merge     = require('./merge');

function promise(){
    return new Promise((resolve, reject) => {
        console.log("Checking for inputs...");
        setTimeout(function(){
            let result = ['1','3','2'];
            console.log(`Found ${result.length} inputs.`);
            resolve(result);
        }, 2000);
    });
}

gulp.task('promise', function(){
    let val = promise();
    return val;
});

function stream(val, result){
    return new Promise((resolve, reject) => 
        gulp.src('data/*.js')
        //.pipe(debug())
        .pipe(transform())
        .pipe(merge(val, result))
        .on('end', resolve(result.length))
    );
}

gulp.task('stream', function(){
    promise()
    .then(val => stream(val, {}))
    .then(result => console.log("Finished: ", result))
    .catch(console.error);    
});

gulp.task('default', function(){

});