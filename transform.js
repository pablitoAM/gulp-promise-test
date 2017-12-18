const through = require('through2');

module.exports = function(){    

    let stream = through.obj(function(input, encoding, callback) {
        console.log(`Processing a ${input.constructor.name}`);
        this.push(transform(input));
        callback();
    });

    function transform(input){
        console.log('Transform: ', input.path);
        let path = '' + input.path;
        let pathSplit = input.path.split('/');
        let fileSplit = pathSplit[pathSplit.length-1].split('_');
        return {key: fileSplit[0], value: fileSplit[1].replace('.js', '')};
    }
    
    return stream;
}