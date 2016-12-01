var http = require('http')

var address = process.argv[2];
//console.log(address);

//http.get(address,
//    (res) => {
//        const statusCode = res.statusCode;
//        if (statusCode !== 200) {
//            console.log(`Got response: ${statusCode}`);
//            res.resume();
//            return;
//        }

//        // consume response body
//        //res.resume();

//        res.on("data",
//            (data) => {
//                console.log(data.toString());
//            }
//        );

//        res.on("error",
//            (error) => {
//                console.error("onError");
//            }
//        );
//    }
//).on('error',
//        (e) => {
//        console.log(`GET error: ${e.message}`);
//    }
//);

http.get(address,
    (res) => {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            console.log(`Got response: ${statusCode}`);
            res.resume();
            return;
        }

        // consume response body
 
        var data = "";
        res.on("data",
            (chunk) => {
                data += chunk + "\n";
            }
        );
        res.on("end",
            () => {
                console.log(data);
            }
        );
        res.on("error",
            (error) => {
                console.error("onError");
            }
        );
    }
).on("error",
    (e) => {
        console.error(`GET error: ${e.message}`);
    }
    );





   
