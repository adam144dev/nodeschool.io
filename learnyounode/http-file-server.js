﻿var http = require('http');
var fs = require("fs");
// using bl package version
var bl = require('bl');

var port = process.argv[2];
var filePath = process.argv[3];

var clientRequest = function(request, response) {
    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });

    response.on('error', (err) => {
        console.error(err);
    });

    //request.on('data', (data) => {
    //    // data not used
    //});

    request.on('end', () => {
        response.writeHead(200, { 'Content-Type': 'text/plain' });

        var file = fs.createReadStream(filePath);
        file.pipe(
            bl(
                function (err, data) {
                    if (err) {
                        return console.error(err);
                    }

                    response.end(data);
                }
            )
        );
        //file.pipe(response);  // does not work (?)
        //response.end();

        console.log('client served');
    });

    request.resume();
}

var server = http.createServer(clientRequest);
server.on("error", (error) => {
    console.error(`GET error: ${error.message}`);
});
server.listen(
    port,
    () => {
        console.log('server bound');
    }
);


