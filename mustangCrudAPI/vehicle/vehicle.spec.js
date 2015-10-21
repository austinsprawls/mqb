'use strict';

var mongoose = require('mongoose');
var should = require('should');
var request = require('supertest');
var _ = require('underscore');

var app = require('../../app');
var Quote = require('../quote/quote.model');
var Vehicle = require('./vehicle.model');
var vehicleCtrl = require('./vehicle.controller');

describe('VehicleCtrl', function () {
    var quote = null;
    var quoteID = null;

    beforeEach(function (done) {
        mongoose.connection.collections['quotes'].drop(function () {
            mongoose.connection.collections['vehicles'].drop(function () {
                quote = Quote();
                quoteID = quote._id;
                quote.save(done);
            });
        });
    });

    afterEach(function (done) {
        mongoose.connection.collections['quotes'].drop(done);
    });

    describe('GET /api/quotes/:quoteID/vehicles', function() {

        it('should respond with 200 when successful', function (done) {
            request(app)
                .get('/api/quotes/' + quoteID + '/vehicles')
                .expect(200, done);
        });

        it('should respond with 500 when no quoteID provided', function (done) {
            request(app)
                .get('/api/quotes/' + null + '/vehicles')
                .expect(500, done);
        });

        it('should respond with Content-Type application/json', function (done) {
            request(app)
                .get('/api/quotes/' + quoteID + '/vehicles')
                .expect('Content-Type', /json/, done);
        });

        it('should respond with an array', function (done) {
            request(app)
                .get('/api/quotes/' + quoteID + '/vehicles')
                .end(function (err, res) {
                    if (err) return done(err);

                    res.body.should.be.instanceof(Array);
                    done();
                });
        });

        it('should respond with array of length 0 when no vehicles present', function (done) {
            request(app)
                .get('/api/quotes/'+ quoteID + '/vehicles')
                .end(function(err, res) {
                    if (err) return done(err);

                    res.body.length.should.equal(0);
                    done();
                });
        });

        it('should respond with array of length 1 when 1 vehicle present', function(done) {
            var newVehicle = new Vehicle();
            quote.vehicles = [newVehicle._id];

            newVehicle.save(function(err){
                if (err) return done(err);

                quote.save(function(err){
                    if (err) return done(err);

                    request(app)
                        .get('/api/quotes/'+ quoteID + '/vehicles')
                        .end(function(err, res) {
                            if (err) return done(err);

                            res.body.length.should.equal(1);
                            done();
                        });
                });
            });
        });
    });

    describe('POST /api/quotes/:quoteID/vehicles', function () {

        it('should respond with 201 if new vehicle is created', function (done) {
            request(app)
                .post('/api/quotes/' + quoteID + '/vehicles')
                .expect(201, done);
        });

        it('should respond with 500 if quoteID not provided', function (done) {
            request(app)
                .post('/api/quotes/' + null + '/vehicles')
                .expect(500, done);
        });

        it('should respond with Content-Type application/json', function (done) {
            request(app)
                .post('/api/quotes/' + quoteID + '/vehicles')
                .expect('Content-Type', /json/, done);
        });

        it('should add a vehicle to Quotes vehicles array', function (done) {
            request(app)
                .post('/api/quotes/' + quoteID + '/vehicles')
                .end(function (err, res) {
                    if (err) return done(err);

                    Quote.findById(quoteID)
                        .select('vehicles')
                        .populate('vehicles')
                        .exec(function (err, quote) {
                            if (err) return done(err);
                            res.body._id.should.equal(quote.vehicles[0]._id.toString());

                            done();
                        });
                });
        });
    });

    describe('PUT /api/quotes/:quoteID/vehicles/:id', function (done) {
        var newVehicle = null;
        var newVehicleID = null;

        beforeEach(function (done) {
            newVehicle = new Vehicle();
            newVehicleID = newVehicle._id;
            quote.vehicles = [newVehicleID];
            newVehicle.save(function (err) {
                if (err) return done(err);

                quote.save(done);
            })
        });

        it('should respond with 200 when successful', function (done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/vehicles/'+ newVehicleID)
                .expect(200, done);
        });

        it('should respond with 404 when vehicle is not found', function (done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/vehicles/')
                .expect(404, done);
        });

        it('responds with 500 if vehicleID not provided' , function (done) {
            request(app)
                .put('/api/quotes/'+ quoteID +'/vehicles/'+ null)
                .expect(500, done);
        });

        it('should respond with an Content-Type application/json', function (done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/vehicles/'+ newVehicleID)
                .expect('Content-Type', /json/, done);
        });

        it('should respond with the vehicle with a matching _id', function (done) {
            request(app)
                .put('/api/quotes/'+ quoteID +'/vehicles/'+ newVehicleID)
                .send({})
                .end(function(err, res){
                    if(err) return done(err);

                    res.body._id.should.equal(newVehicleID.toString());
                    done();
                });
        });

        it('updates an existing vehicle', function(done){
            var body = { make: "Yugo" };

            request(app)
                .put('/api/quotes/'+ quoteID +'/vehicles/'+ newVehicleID)
                .send(body)
                .end(function(err, res) {
                    if (err) return done(err);

                    res.body.make.should.equal(body.make);
                    done();
                });
        });
    });

    describe('DELETE /api/quotes/:quoteID/vehicles/:id', function (done) {
        var newVehicle = null;
        var newVehicleID = null;

        beforeEach(function (done) {
            newVehicle = new Vehicle();
            newVehicleID = newVehicle._id;
            quote.vehicles = [newVehicleID];
            newVehicle.save(function (err) {
                if (err) return done(err);

                quote.save(done);
            });
        });

        it('should respond with 204 when successful', function (done) {
            request(app)
                .delete('/api/quotes/' + quoteID + '/vehicles/' + newVehicleID)
                .expect(204, done);
        });

        it('should respond with 500 if vehicleID not provided' , function (done) {
            request(app)
                .delete('/api/quotes/'+ quoteID +'/vehicles/' + null)
                .expect(500, done);
        });

        it('should have an empty response body', function(done) {
            request(app)
                .delete('/api/quotes/'+ quoteID + '/vehicles/' + newVehicleID)
                .end(function (err, res) {
                    _.isEmpty(res.body).should.be.true;
                    done();
                });
        });

        it('should remove the specified vehicle from the DB', function (done) {
            request(app)
                .delete('/api/quotes/'+ quoteID + '/vehicles/' + newVehicleID)
                .end(function (err, res) {
                    Vehicle.findById(newVehicleID)
                        .exec(function (err, vehicle) {
                            if(err) return done(err);

                            should.not.exist(vehicle);
                            done();
                        });
                });
        });

        it('should remove specified vehicleID from specified quote', function (done) {
            request(app)
                .delete('/api/quotes/'+ quoteID + '/vehicles/' + newVehicleID)
                .end(function (err, res) {
                    Quote.findById(quoteID)
                        .select('vehicles')
                        .populate('vehicles')
                        .exec(function (err, quote) {
                            if(err) return done(err);

                            should.equal(quote.vehicles.length, 0);
                            done();
                        });
                });
        });
    });
});
