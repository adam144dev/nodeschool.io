var http = require('http');

//var address = process.argv[2];
//console.log(address);

var received = 0;
var results = [];

var GetOnError = function (error) {
    console.error(`GET error: ${error.message}`);
}

function printResults() {
    for (let i = 0; i < 3; i++) {
        console.log(results[i]);
    }
}

// pure node.js version
//function HttpGet(i) {
//    http.get(
//        process.argv[2 + i],
//        function(response) {
//            const statusCode = response.statusCode;
//            if (statusCode !== 200) {
//                console.error(`Got response: ${statusCode}`);
//                response.resume();
//                return;
//            }

//            response.on("error", (error) => { console.error("onError"); });

//            // consume response body
//            var chunks = [];
//            response.on("results",
//            (chunk) => {
//                //console.log(chunk);
//                chunks.push(chunk);
//            });

//            response.on("end",
//            () => {
//                received++;
//                results[i] = Buffer.concat(chunks);
//            });
//        })
//        .on("error", GetOnError);
//}

// using bl package version
var bl = require('bl');
function HttpGet(i) {
    http.get(
        process.argv[2 + i],
        function(response) {
            response.pipe(
                bl(
                    function(err, data) {
                        if (err) {
                            return console.error(err);
                        }

                        results[i] = data.toString();
                        received++;

                        if (received === 3) {
                            printResults();
                        }
                    }
                )
            );
        }
    )
        .on("error", GetOnError);
          
}

// both versions
for (i = 0; i < 3; i++) {
    HttpGet(i);
}

// pure node.js version
//function Wait() {
//    if (received < 3) {
//        setTimeout(Wait, 100);
//    } else {
//        printResults();
//    }    
//}
//Wait();









