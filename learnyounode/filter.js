﻿var fs = require('fs');
var path = require('path');

var file = process.argv[2];
var ext = '.' + process.argv[3];


fs.readdir(file, function (err, files) {
    if (err) {
        return console.log(err)
    }

    files.forEach(function(element) {
        if (path.extname(element) === ext)
        {
            console.log(element);
        }
    }, this);
})
