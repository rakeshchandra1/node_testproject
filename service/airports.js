var airportsService = require("./airportsservice.js");
var _ = require("underscore");

var airports = '';
var error = '';

airportsService.query(
    function(result) {
        airports = result.airports;
    }, function(error) {
        error = error;
    }
);

getCountryResults = function(country) {
    return (country) ? 
        _.filter(airports, function(a){ return a.country && a.country.code === country; }) :
        airports;
};

exports.setAirports = function(data) {
    airports = data;
};

exports.all = function(req, res) {
    if(airports) {
        res.send(airports);
    } else {
        res.statusCode = 500;
        res.send(error);
    }
};

exports.queryByCode = function(req, res) {
    var code = req.params.code;
    if(airports) {
        res.send(_.where(airports, {"code": code}));
    } else {
        res.statusCode = 500;
        res.send(error);
    }
};

exports.queryByCountry = function(req, res) {
    var country = req.params.country;
    if(airports) {
        res.send(getCountryResults(country));
    } else {
        res.statusCode = 500;
        res.send(error);
    }
};

exports.filterInternationalAirports = function(req, res) {
    var country = req.params.country;
    if(airports) {
        res.send(_.where(getCountryResults(country), {"international_airport": true}));
    } else {
        res.statusCode = 500;
        res.send(error);
    }
};

exports.filterRegionalAirports = function(req, res) {
    var country = req.params.country;
    if(airports) {
        res.send(_.where(getCountryResults(country), {"regional_airport": true}));
    } else {
        res.statusCode = 500;
        res.send(error);
    }
};