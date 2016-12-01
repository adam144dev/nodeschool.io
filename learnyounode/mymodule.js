var fs = require('fs');
var path = require('path');

module.exports = function (filesPath, ext, callback)
{
    fs.readdir(filesPath, 
        function (err, files) {
            if (err) {
                return callback(err);
            }

            callback(null, files.filter(
                function(file) {
                    return path.extname(file) === '.' + ext;
                }
            ));
        }
    );
}