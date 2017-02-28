var assert = require('assert');
var request = require('supertest');
var airports = require('./service/airports.js');
 
describe('tests to confirm the result from routes', function () {
    var server;
    beforeEach(function () {
        server = require('./app').server;
        var data = [{"code":"BZD","display_name":"Balranald","international_airport":false,"regional_airport":false,"location":{"latitude":-34.616665,"longitude":143.61667},"currency_code":"AUD","timezone":"Australia/Sydney","country":{"code":"AU","display_name":"Australia"}},{"code":"BZG","display_name":"Bydgoszcz","international_airport":false,"regional_airport":true,"location":{"latitude":53.266666,"longitude":18},"currency_code":"PLN","timezone":"Europe/Warsaw","country":{"code":"PL","display_name":"Poland"}},{"code":"WRO","display_name":"Wroclaw","international_airport":true,"regional_airport":false,"location":{"latitude":51.083332,"longitude":17},"currency_code":"PLN","timezone":"Europe/Warsaw","country":{"code":"PL","display_name":"Poland"}}];
        airports.setAirports(data);
        
    });
    
    it('should respond with airport data when root is requested', function (done) {
      request(server)
        .get('/')
        .expect(200)
        .end(function (err, response) {
          assert.equal(response.statusCode, '200');
          assert.equal(response.body[0].code, 'BZD');
          done();
        });
    });
    
    it('should respond with country specific airports only when queried on country', function (done) {
      request(server)
        .get('/country/PL')
        .expect(200)
        .end(function (err, response) {
          assert.equal(response.statusCode, '200');
          assert.equal(response.body[0].code, 'BZG');
          done();
        });
    });
    
    it('should respond with airport data when queried on airport code', function (done) {
      request(server)
        .get('/code/WRO')
        .expect(200)
        .end(function (err, response) {
          assert.equal(response.statusCode, '200');
          assert.equal(response.body[0].code, 'WRO');
          done();
        });
    });
    
    it('should respond with international airports in country when queried', function (done) {
      request(server)
        .get('/country/PL/international')
        .expect(200)
        .end(function (err, response) {
          assert.equal(response.statusCode, '200');
          assert.equal(response.body[0].code, 'WRO');
          done();
        });
    });
    
    it('should respond with regional airports in country when queried', function (done) {
      request(server)
        .get('/country/PL/regional')
        .expect(200)
        .end(function (err, response) {
          assert.equal(response.statusCode, '200');
          assert.equal(response.body[0].code, 'BZG');
          done();
        });
    });
});