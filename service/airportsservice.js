var http = require("https");

exports.query = function(onResult, onError) {
    var options = { 
        "method": "GET",
        "hostname": "www.qantas.com.au",
        "port": null,
        "path": "/api/airports",
        "headers": {
            "cache-control": "no-cache"
        }   
    };
    
    var req = http.request(options, function (res) {
        var chunks = [];
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });

        res.on("end", function () {
            var body = Buffer.concat(chunks);
            jsonData = JSON.parse(body.toString());
            onResult(jsonData);
        });
    });
    
    req.on('error', function(err) {
        onError(err.message);
    });

    req.end();
}

