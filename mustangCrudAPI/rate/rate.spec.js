/**
 * Unit Testing
 * Always clean the database
 * Keep each it function to one assertion
 * Try to fully describe each route, success code, failure codes, content type, return type, etc.
 */

'use strict';

var should = require('should');
var mongoose = require('mongoose');
var request = require('supertest');
var _ = require('underscore');

var app = require('../../app');
var Quote = require('../quote/quote.model');
var Rate = require('./rate.model');
var RateCtrl = require('./rate.controller');


xdescribe('RateCtrl', function(){
  var quote = null;
  var quoteID = null;

  beforeEach(function(done){
    mongoose.connection.collections['quotes'].drop(function(){
      mongoose.connection.collections['rates'].drop(function(){
        quote = Quote();
        quoteID = quote._id;
        quote.save(done);
      });
    });
  });

  afterEach(function(done){
   mongoose.connection.collections['quotes'].drop(done);
  });

  describe('RateCtrl.create', function() {
      it('should create a rate attached to a quote', function(done) {
        Quote.findById(quoteID)
          .select("rates")
          .populate("rates")
          .exec(function (err, rate) {
            if (err) {
              return done(err)
            }
            console.log("here");
            console.log();
            console.log(rate);
            done();
          });
      });
      //  var test = quote.rates;
      //  console.log("test", test);
      //  console.log("rate", rate);
      //  done();
      //
      //
      //  Rate.create({ _quoteID: quote._id }, function(err, rate){
      //    //.select("rates")
      //    //.populate("rates")
      //    //.exec(function(err, quote) {
      //    //  if (err) {
      //    //    return done(err)
      //    //  }
      //    //  var rates = quote.rates;
      //    //  console.log("rate", rate);
      //    //  done();
      //    //});
      //});
  });

    //  it('should create a rate attached to a quote', function(done) {
    //
    //
    //    request(app)
    //      .get('/api/rates')
    //      .expect(200)
    //      .expect('Content-Type', /json/)
    //      .end(function(err, res) {
    //        if (err) return done(err);
    //        res.body.should.be.instanceof(Array);
    //        done();
    //      });
    //  });
    //});
    //
    //
    //describe('GET /api/quotes/:quoteID/rates/', function() {
    //
    //  it('should respond with JSON array', function(done) {
    //    request(app)
    //      .get('/api/rates')
    //      .expect(200)
    //      .expect('Content-Type', /json/)
    //      .end(function(err, res) {
    //        if (err) return done(err);
    //        res.body.should.be.instanceof(Array);
    //        done();
    //      });
    //  });
    //});
    //
    //
    //describe('GET /api/quotes/:quoteID/additional_drivers', function() {
    //
    //  it('responds with 200 when successful', function(done) {
    //    request(app)
    //      .get('/api/quotes/'+ quoteID + '/additional_drivers')
    //      .expect(200, done);
    //  });
    //
    //  it('responds with 500 if quoteID not provided in url' , function(done){
    //    request(app)
    //      .get('/api/quotes/'+null+'/additional_drivers')
    //      .expect(500, done);
    //  });
    //
    //  it('responds with an Content-Type json', function(done) {
    //    request(app)
    //      .get('/api/quotes/'+ quoteID + '/additional_drivers')
    //      .expect('Content-Type', /json/, done);
    //  });
    //
    //  it('responds with an array', function(done) {
    //    request(app)
    //      .get('/api/quotes/'+ quoteID + '/additional_drivers')
    //      .end(function(err, res) {
    //        if (err){
    //          return done(err)
    //        }
    //        res.body.should.be.instanceof(Array);
    //        done();
    //      });
    //  });
    //
    //  it('responds with array of length 0 when no additionalDrivers present', function(done) {
    //    request(app)
    //      .get('/api/quotes/'+ quoteID + '/additional_drivers')
    //      .end(function(err, res) {
    //        if (err){
    //          return done(err)
    //        }
    //        res.body.length.should.equal(0);
    //        done();
    //      });
    //  });
    //
    //  it('responds with array of length 1 when 1 additionalDriver present', function(done) {
    //    var additionalDriver = new AdditionalDriver();
    //    quote.additionalDrivers = [additionalDriver._id];
    //
    //    additionalDriver.save(function(err){
    //      if(err){
    //        return  done(err)
    //      }
    //      quote.save(function(err){
    //        if(err){
    //          return done(err)
    //        }
    //        request(app)
    //          .get('/api/quotes/'+ quoteID + '/additional_drivers')
    //          .end(function(err, res) {
    //            if (err){
    //              return done(err);
    //            }
    //            res.body.length.should.equal(1);
    //            done();
    //          });
    //      });
    //    });
    //  });
    //
    //});
    //
    //
    //
    //describe('PUT /api/quotes/:quoteID/additional_drivers/:id', function(){
    //  var additionalDriver = null;
    //  var additionalDriverID = null;
    //
    //  beforeEach(function(done){
    //    additionalDriver = new AdditionalDriver();
    //    additionalDriverID = additionalDriver._id;
    //    quote.additionalDrivers = [additionalDriverID];
    //    additionalDriver.save(function(err){
    //      if(err){
    //        return  done(err)
    //      }
    //      quote.save(done);
    //    });
    //  });
    //
    //  it('responds with 200 when successful', function(done) {
    //    request(app)
    //      .put('/api/quotes/'+ quoteID + '/additional_drivers/'+ additionalDriverID)
    //      .expect(200, done);
    //  });
    //
    //  it('responds with 404 when additionalDriver is not found', function(done) {
    //    request(app)
    //      .put('/api/quotes/'+ quoteID + '/additional_drivers/')
    //      .expect(404, done);
    //  });
    //
    //  it('responds with 500 if additionalDriver Id not provided in url' , function(done){
    //    request(app)
    //      .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ null)
    //      .expect(500, done);
    //  });
    //
    //  it('responds with an Content-Type json', function(done) {
    //    request(app)
    //      .put('/api/quotes/'+ quoteID + '/additional_drivers/'+ additionalDriverID)
    //      .expect('Content-Type', /json/, done);
    //  });
    //
    //  it('responds with the additional Driver with a matching _id', function(done){
    //    request(app)
    //      .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ additionalDriverID)
    //      .send({})
    //      .end(function(err, res){
    //        if(err){
    //          return done(err);
    //        }
    //        res.body._id.should.equal(additionalDriverID.toString());
    //        done();
    //      })
    //  });
    //
    //  it('updates an existing additional Driver', function(done){
    //    var body = {
    //      lastName: "Tester"
    //    };
    //
    //    request(app)
    //      .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ additionalDriverID)
    //      .send(body)
    //      .end(function(err, res) {
    //        if (err){
    //          return done(err);
    //        }
    //        res.body.lastName.should.equal(body.lastName);
    //        done();
    //      });
    //  });
    //
    //});

});


