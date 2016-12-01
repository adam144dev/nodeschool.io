var mymodule = require('./mymodule.js')

var filesPath = process.argv[2];
var ext = process.argv[3];



mymodule(filesPath, ext, 
    function (err, data) {
        if (err) {
            return console.error('There was an error:', err)
        }

        data.forEach(function(e) {
            console.log(e);
        });
    }
);