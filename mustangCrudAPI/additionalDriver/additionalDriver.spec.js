/**
 * Unit Testing
 * Always clean the DB collections
 * Keep each it function to one assertion
 * Try to fully describe each route, success code, failure codes, content type, return type, ect.
 */

'use strict';

var should = require('should');
var mongoose = require('mongoose');
var request = require('supertest');
var _ = require('underscore');

var app = require('../../app');
var Quote = require('../quote/quote.model');
var AdditionalDriver = require('./additionalDriver.model');
var additionalDriverCtrl = require('./additionalDriver.controller');

describe('AdditionalDriverCtrl', function(){
    var quote = null;
    var quoteID = null;

    beforeEach(function(done){
        mongoose.connection.collections['quotes'].drop(function(){
            mongoose.connection.collections['additionaldrivers'].drop(function(){
                quote = Quote();
                quoteID = quote._id;
                quote.save(done);
            });
        });
    });

    afterEach(function(done){
        mongoose.connection.collections['quotes'].drop(done);
    });

    describe('GET /api/quotes/:quoteID/additional_drivers', function() {

        it('responds with 200 when successful', function(done) {
            request(app)
                .get('/api/quotes/'+ quoteID + '/additional_drivers')
                .expect(200, done);
        });

        it('responds with 500 if quoteID not provided in url' , function(done){
            request(app)
                .get('/api/quotes/'+null+'/additional_drivers')
                .expect(500, done);
        });

        it('responds with an Content-Type json', function(done) {
            request(app)
                .get('/api/quotes/'+ quoteID + '/additional_drivers')
                .expect('Content-Type', /json/, done);
        });

        it('responds with an array', function(done) {
            request(app)
                .get('/api/quotes/'+ quoteID + '/additional_drivers')
                .end(function(err, res) {
                    if (err){
                        return done(err)
                    }
                    res.body.should.be.instanceof(Array);
                    done();
                });
        });

        it('responds with array of length 0 when no additionalDrivers present', function(done) {
            request(app)
                .get('/api/quotes/'+ quoteID + '/additional_drivers')
                .end(function(err, res) {
                    if (err){
                        return done(err)
                    }
                    res.body.length.should.equal(0);
                    done();
                });
        });

        it('responds with array of length 1 when 1 additionalDriver present', function(done) {
            var additionalDriver = new AdditionalDriver();
            quote.additionalDrivers = [additionalDriver._id];

            additionalDriver.save(function(err){
                if(err){
                    return done(err)
                }
                quote.save(function(err){
                    if(err){
                        return done(err)
                    }
                    request(app)
                        .get('/api/quotes/'+ quoteID + '/additional_drivers')
                        .end(function(err, res) {
                            if (err){
                                return done(err);
                            }
                            res.body.length.should.equal(1);
                            done();
                        });
                });
            });
        });

    });

    describe('POST /api/quotes/:quoteID/additional_drivers/:id', function() {

        it('responds with 500 if quotedID not provided in url', function(done){
            request(app)
                .get('/api/quotes/'+null+'/additional_drivers')
                .expect(500)
                .end(done);
        });

        it('responds with 201 if additionalDriver is successfully created', function(done){
            request(app)
                .post('/api/quotes/'+ quoteID +'/additional_drivers')
                .expect(201)
                .end(done);
        });

        it('responds with an Content-Type json', function(done) {
            request(app)
                .post('/api/quotes/'+ quoteID + '/additional_drivers')
                .expect('Content-Type', /json/, done);
        });

        //TODO figure out why contain is not working with additionalDrivesArr and result _id
        it('adds additionalDriver to Quotes additionalDrivers array', function(done){
            request(app)
                .post('/api/quotes/'+ quoteID +'/additional_drivers')
                .end(function(err, res) {
                    if (err){
                        return done(err)
                    }
                    Quote.findById(quoteID)
                        .select("additionalDrivers")
                        .populate("additionalDrivers")
                        .exec(function(err, quote){
                            if (err){
                                return done(err)
                            }
                            //var additionalDriversArr = [];
                            //quote.additionalDrivers.forEach(function(additionalDriver){
                            //  additionalDriversArr.push(additionalDriver.id);
                            //});
                            var additionalDriversArr = quote.additionalDrivers;
                            res.body._id.should.equal(additionalDriversArr[0]._id.toString());
                            done();
                        });
                });
        });

    });

    describe('PUT /api/quotes/:quoteID/additional_drivers/:id', function(){
        var additionalDriver = null;
        var additionalDriverID = null;

        beforeEach(function(done){
            additionalDriver = new AdditionalDriver();
            additionalDriverID = additionalDriver._id;
            quote.additionalDrivers = [additionalDriverID];
            additionalDriver.save(function(err){
                if(err){
                    return done(err)
                }
                quote.save(done);
            });
        });

        it('responds with 200 when successful', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/additional_drivers/'+ additionalDriverID)
                .expect(200, done);
        });

        it('responds with 404 when additionalDriver is not found', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/additional_drivers/')
                .expect(404, done);
        });

        it('responds with 500 if additionalDriver Id not provided in url' , function(done){
            request(app)
                .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ null)
                .expect(500, done);
        });

        it('responds with an Content-Type json', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/additional_drivers/'+ additionalDriverID)
                .expect('Content-Type', /json/, done);
        });

        it('responds with the additional Driver with a matching _id', function(done){
            request(app)
                .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ additionalDriverID)
                .send({})
                .end(function(err, res){
                    if(err){
                        return done(err);
                    }
                    res.body._id.should.equal(additionalDriverID.toString());
                    done();
                });
        });

        it('updates an existing additional Driver', function(done){
            var body = {
                lastName: "Tester"
            };

            request(app)
                .put('/api/quotes/'+ quoteID +'/additional_drivers/'+ additionalDriverID)
                .send(body)
                .end(function(err, res) {
                    if (err){
                        return done(err);
                    }
                    res.body.lastName.should.equal(body.lastName);
                    done();
                });
        });

    });

    describe('DELETE /api/quotes/:quoteID/additional_drivers/:id', function(){
        var additionalDriver = null;
        var additionalDriverID = null;

        beforeEach(function(done){
            additionalDriver = new AdditionalDriver();
            additionalDriverID = additionalDriver._id;
            quote.additionalDrivers = [additionalDriverID];
            additionalDriver.save(function(err){
                if(err){
                    return  done(err)
                }
                quote.save(done);
            });
        });

        it('responds with 204 when successful', function(done) {
            request(app)
                .delete('/api/quotes/'+ quoteID + '/additional_drivers/' + additionalDriverID)
                .expect(204, done);
        });

        it('responds with 500 if additionalDriverId not provided in url' , function(done){
            request(app)
                .delete('/api/quotes/'+ quoteID +'/additional_drivers/' + null)
                .expect(500, done);
        });

        it('responds with nothing', function(done) {
            request(app)
                .delete('/api/quotes/'+ quoteID + '/additional_drivers/' + additionalDriverID)
                .end(function(err, res){
                    _.isEmpty(res.body).should.be.true;
                    done();
                });
        });

        it('removes additionalDriver from the DB', function(done){
            request(app)
                .delete('/api/quotes/'+ quoteID + '/additional_drivers/' + additionalDriverID)
                .end(function(err, res){
                    AdditionalDriver.findById(additionalDriverID)
                        .exec(function(err, additionalDriver){
                            if(err){
                                return done(err);
                            }
                            should.not.exist(additionalDriver);
                            done();
                        });
                });
        });

        //TODO find more robust way to make sure the additionalDriverID is not in the object
        it('removes additionalDriverId from appropriate Quote',function(done){
            request(app)
                .delete('/api/quotes/'+ quoteID + '/additional_drivers/' + additionalDriverID)
                .end(function(err, res){
                    Quote.findById(quoteID)
                        .select('additionalDrivers')
                        .populate('additionalDrivers')
                        .exec(function(err, updateQuote){
                            if(err){
                                return done(err);
                            }
                            should.equal(updateQuote.additionalDrivers.length, 0);
                            done();
                        });
                });
        });

    });

    describe('Persist Violations', function(done){
        var additionalDriver = null;
        var additionalDriverID = null;

        beforeEach(function(done){
            additionalDriver = new AdditionalDriver();
            additionalDriverID = additionalDriver._id;
            quote.additionalDrivers = [additionalDriverID];
            additionalDriver.save(function(err){
                if(err){
                    return  done(err);
                }
                quote.save(done);
            });
        });

        it('returns a promise', function(done){
            var violations = [{
                "code": "003",
                "name": "Careless or Improper Operation"
            }];

            var updatedDriver = additionalDriverCtrl.persistViolations(additionalDriverID, violations);
            updatedDriver.should.be.a.Promise;
            done();
        });

        it('adds a violation to an additional driver', function(done){
            var violations = [{
                "code": "003",
                "name": "Careless or Improper Operation"
            }];

            additionalDriverCtrl.persistViolations(additionalDriverID, violations);
            AdditionalDriver.findById(additionalDriverID)
                .exec(function(err, additionalDriver){
                    if(err){
                        return done(err);
                    }
                    additionalDriver.violationsArray[0].code.should.equal(violations[0].code);
                    done();
                });

        });

        it('adds multiple violations to an additional driver', function(done){
            var violations = [{
                code: "003",
                name: "Careless or Improper Operation"
            }, {
                code: "004",
                name: "Defective Equipment"
            }, {
                code: "005",
                name: "Driving Under Suspension"
            }];

            additionalDriverCtrl.persistViolations(additionalDriverID, violations);
            AdditionalDriver.findById(additionalDriverID)
                .exec(function(err, additionalDriver){
                    if(err){
                        return done(err);
                    }
                    should.equal(additionalDriver.violationsArray.length, 3);
                    done();
                });


        });

    })

});


