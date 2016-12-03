var net = require('net')
var strftime = require('./strftime');

var port = process.argv[2];

var timeServer = function(socket) {
    //console.log('client connected');

    socket.on("error", function (error) {
        console.error(`SOCKET error: ${error.message}`);
    });

    //socket.on('data', (data) => {
    // no request data expected; just answer on connect
    //});
    
    socket.on('end', () => {
        console.log('client disconnected');
    });

    //var d = new Date();
    //var date = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDay() + " " + d.getHours() + ":" + d.getMinutes();
    var date = strftime('%Y-%m-%d %H:%M\n', new Date());
    console.log(date);
    socket.end(date);
}

var server = net.createServer(timeServer);
server.on("error", function (error) {
    console.error(`GET error: ${error.message}`);
});
server.listen(
    port,
    () => {
        //console.log('server bound');
    }
);


