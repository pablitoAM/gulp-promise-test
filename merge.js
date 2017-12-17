module.exports = function(val, result){

    'use strict';

    const through           = require("through2");
    const gutil             = require("gulp-util");

    let stream = through.obj(function(input, encoding, callback) {
        console.log(`Processing a ${input.constructor.name}`);
        this.push(merge(input));
        callback();
    });

    function merge(input){
        console.log("Merge: ", input);
        let key = input.key;
        let value = input.value;
        if(val.includes(value)){
            result[value] = input;
        }
        console.log(`Val: ${val}, Result: ${Object.keys(result)}`);
        return input;
    }
        
    return stream;
}