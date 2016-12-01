var http = require('http')

var address = process.argv[2];

http.get(address,
    (res) => {
        const statusCode = res.statusCode;
        if (statusCode !== 200) {
            console.log(`Got response: ${statusCode}`);
            res.resume();
            return;
        }

        // consume response body
 
        var data = [];
        res.on("data",
            (chunk) => {
                data += chunk;
            }
        );
        res.on("end",
            () => {
                console.log(data.length);
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





   
