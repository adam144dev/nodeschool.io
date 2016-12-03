var http = require('http');
var fs = require("fs");
var url = require('url');

var port = process.argv[2];

function response400(response, log, msg) {
    console.log(log);
    response.writeHead(400, { 'Content-Type': 'text/plain' });
    return response.end(msg);
}

function parseTime(request, response, query) {
    //request.on('data', (chunk) => {
    //    // data not used
    //});
    //request.on('end', () => {
    //    response.writeHead(200, { 'Content-Type': 'application/json' });
    //    response.end();

    //    console.log('client served - parseTime');
    //});

    request.resume();

    var date = new Date(query.iso);
    //console.log(date);

    var body = {
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(body));

    console.log('client served - parseTime');
}

function unixTime(request, response, query) {
    //request.on('data', (chunk) => {
    //    // data not used
    //});
    //request.on('end', () => {
    //    response.writeHead(200, { 'Content-Type': 'application/json' });
    //    response.end();

    //    console.log('client served - parseTime');
    //});

    request.resume();

    var date = new Date(query.iso);
    //console.log(date);

    var body = {
        unixtime: date.getTime()
    }

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(body));

    console.log('client served - unixTime');
}

var router = function (request, response) {
    request.on('error', (err) => {
        response400(response, err, "");
    });
    response.on('error', (err) => {
        console.error(err);
    });

    if (request.method !== 'GET') {
        return response400(response, 'client requested not POST', 'send me a GET\n');
    }

    var urlParsed = url.parse(request.url, true);
    switch (urlParsed.pathname) {
        case "/api/parsetime":
            parseTime(request, response, urlParsed.query);
        break;
        
        case "/api/unixtime":
            unixTime(request, response, urlParsed.query);
        break;

        default:
            return response400(response, 'client requested BAD: pathname', 'send me a GOOD pathname\n');
    }
}

var server = http.createServer(router);
server.on("error", (error) => {
    console.error(`GET error: ${error.message}`);
});
server.listen(
    port,
    () => {
        console.log('server bound');
    }
);


