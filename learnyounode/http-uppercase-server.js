var http = require('http');
var fs = require("fs");
// using bl package version
var bl = require('bl');

var port = process.argv[2];
var filePath = process.argv[3];

var clientRequest = function(request, response) {
    if (request.method !== 'POST') {
        console.log('client requested not POST');
        response.writeHead(400, { 'Content-Type': 'text/plain' });
        return response.end('send me a POST\n');
    }

    request.on('error', (err) => {
        console.error(err);
        response.statusCode = 400;
        response.end();
    });

    response.on('error', (err) => {
        console.error(err);
    });

    var body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    });

    request.on('end', () => {
        body = Buffer.concat(body).toString().toUpperCase();
        response.writeHead(200, { 'Content-Type': 'text/plain' });
        response.end(body);

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


