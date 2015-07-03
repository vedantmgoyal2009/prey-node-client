var helpers = require('./../../../../helpers'),
  should = require('should'),
  google_strat = helpers.load('providers/geo/strategies').google,
  location_response = require('../fixtures/google_location_response');

describe('location', function() {

  describe('when access points return error', function() {

  });

  describe('when access points list is empty', function() {

  });

  describe('when access points is valid', function() {

    var provider_stub = {};

    before(function() {
      var list = require('./../fixtures/parsed_access_points_list');
      provider_stub = helpers.stub_provider('access_points_list', null, list);
    });

    after(function() {
      provider_stub.restore();
    });

    describe('and geolocation endpoint returns error', function() {

      it('returns error', function() {

      });

    });

    describe('and geolocation endpoint returns 200 OK', function() {

      describe('and response is not valid', function() {

        before(function() {
          helpers.stub_request('get', null, {}, 'Bad response');
        });

        it('returns error', function(done) {

          google_strat(function(err, data) {
            err.should.be.an.instanceof(Error);
            should.not.exist(data);
            done();
          });

        });

      });

      describe('and response contains valid coordinates', function() {

        before(function() {
          helpers.stub_request('get', null, { statusCode: 200 }, location_response);
        });

        it('callsback coordinates', function(done) {

          google_strat(function(err, data) {
            should.not.exist(err);
            data.should.have.keys(['lat', 'lng', 'accuracy', 'method']);
            done();
          });

        });

        it('sets method to wifi', function(done) {

          google_strat(function(err, data) {
            data.method.should.equal('wifi');
            done();
          });

        });

      });

      describe('real endpoint', function() {

        it('works', function(done) {

          this.timeout(3000); // response may take longer

          google_strat(function(err, data) {
            if (err) {
              console.log('\n========================================');
              console.log(' Geolocation endpoint seems to be down!');
              console.log(' ' + err.message);
              console.log('========================================\n');
            }
            done();
          });

        });

      });

    });

  });

});