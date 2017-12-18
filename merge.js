const through = require('through2');
module.exports = function(val){

    'use strict';

    let stream = through.obj(function(input, encoding, callback) {
        console.log(`Processing a ${input.constructor.name}`);
        let filtered = filter(input);
        if(filtered){
            this.push(filtered);            
        }
        callback();
    });

    function filter(input){
        console.log('Filter: ', input);
        let key = input.key;
        let value = input.value;
        if(val.includes(value)){            
            console.log(`${input.value} in val: ${val}: accepted.\n`);
            return input;
        }        
        console.log(`${input.value} not val: ${val}: rejected.\n`);
        return undefined;
    }
        
    return stream;
}