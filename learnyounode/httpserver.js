var http = require('http');

http.createServer(function (request, response) {
    var headers = request.headers;
    var method = request.method;
    var url = request.url;
    var body = [];
    request.on('error', function (err) {
        console.error(err);
        response.statusCode = 400;
        response.end();
    }).on('data', function (chunk) {
        body.push(chunk);
    }).on('end', function () {
        body = Buffer.concat(body).toString();
        // At this point, we have the headers, method, url and body, and can now
        // do whatever we need to in order to respond to this request.
        });

    response.on('error', function (err) {
        console.error(err);
    });

    response.writeHead(200, { 'Content-Type': 'application/json' });
    var responseBody = {
        headers: headers,
        method: method,
        url: url,
        body: body
    };

    var json = JSON.stringify(responseBody);
    //console.log(json);
    response.end(json);
}).listen(8080); // Activates this server, listening on port 8080.

console.log("lisyen");
