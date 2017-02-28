var express = require("express");
var http = require("https");

var app = express();

var routes = require("./routes/routes.js")(app, express);

app.listen(3000, function() {
    console.log("Server started on port 3000");
});

exports.server = app;