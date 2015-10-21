'use strict';
/*Start imported npm modules*/
var should = require('should');
var mongoose = require('mongoose');
var request = require('supertest');
var _ = require('underscore');
/*End imported npm modules*/

/*Start local variables for spec*/
var app = require('../../app');
var Quote = require('../quote/quote.model');
var primaryDriver = require('./primaryDriver.index')(),
    primaryDriverCtrl = primaryDriver.controller,
    primaryDriverModel = primaryDriver.model;
/*End local variables for spec*/



describe('primaryDriverCtrl', function(){
    var quote = null;
    var quoteID = null;

    /* Start before and after hooks*/
    beforeEach(function(done){
        mongoose.connection.collections['quotes'].drop(function(){
            mongoose.connection.collections['primarydrivers'].drop(function(){
                quote = Quote();
                quoteID = quote._id;
                quote.save(done);
            });
        });
    });

    afterEach(function(done){
        mongoose.connection.collections['quotes'].drop(done);
    });
    /* End before and after hooks*/

    /*Start unit tests*/
    describe('GET /api/quotes/:quoteID/primary_drivers/:id', function(){
        /*Start test specific variables*/
        var primaryDriver = null;
        var primaryDriverID = null;
        /*End test specific variables*/

        /* Start specific before and after hooks*/
        beforeEach(function(done){
            primaryDriver = new primaryDriverModel();
            primaryDriverID = primaryDriver._id;
            quote.primaryDriver = [primaryDriverID];
            primaryDriver.save(function(err){
                if(err){
                    return  done(err);
                }
                quote.save(done);
            });
        });
        /* End specific before and after hooks*/


        it('responds with 200 if primaryDriver successfully returned', function(done){
            request(app)
                .get('/api/quotes/'+ quoteID +'/primary_drivers/' + primaryDriverID)
                .expect(200)
                .end(done);
        });

        it('responds with 404 if primaryDriver could not be found', function(done){
            request(app)
                .get('/api/quotes/'+ quoteID +'/primary_drivers/')
                .expect(404)
                .end(done);
        });

        xit('responds with 500 if quoteID not provided in url', function(done){
            //TODO figure out how to force a 500 error to occur when quoteID not needed
            request(app)
                .get('/api/quotes/'+ null +'/primary_drivers/')
                .expect(500)
                .end(done);
        });

        it('responds with the found primaryDriver', function(done){
            request(app)
                .get('/api/quotes/'+ quoteID +'/primary_drivers/'+ primaryDriverID)
                .end(function(err, res){
                    primaryDriverID.toString().should.equal(res.body._id.toString());
                    done();
                })
        });
    });


    describe('POST /api/quotes/:quoteID/primary_drivers', function() {

        it('responds with 500 if quotedID not provided in url', function(done){
            request(app)
                .post('/api/quotes/'+null+'/primary_drivers')
                .expect(500)
                .end(done);
        });

        it('responds with 201 if primaryDriver is successfully created', function(done){
            request(app)
                .post('/api/quotes/'+ quoteID +'/primary_drivers')
                .expect(201)
                .end(done);
        });

        it('responds with an Content-Type json', function(done) {
            request(app)
                .post('/api/quotes/'+ quoteID + '/primary_drivers')
                .expect('Content-Type', /json/, done);
        });

        it('responds with the created primary driver', function(done){
            request(app)
                .post('/api/quotes/'+ quoteID +'/primary_drivers')
                .end(function(err, res){
                    var primaryDriverID = res.body._id;
                    primaryDriverModel.findById(primaryDriverID)
                        .exec( handlePrimaryDriver );

                    function handlePrimaryDriver(err, primaryDriver){
                        if (err) return done(err);

                        primaryDriverID.should.equal(primaryDriver._id.toString());
                        done();
                    }
                })
        });

        it('adds created primary driver to proper quote', function(done){
            request(app)
                .post('/api/quotes/'+ quoteID +'/primary_drivers')
                .end(function(err, res){
                    Quote.findById(quoteID)
                        .select('primaryDriver')
                        .populate('primaryDriver')
                        .exec( handleQuote );

                    function handleQuote(err, quote){
                        if (err) return done(err);

                        res.body._id.should.equal(quote.primaryDriver._id.toString());
                        done();
                    }
                })
        });
    });

    describe('PUT /api/quotes/:quoteID/primary_drivers/:id', function(){
        /*Start test specific variables*/
        var primaryDriver = null;
        var primaryDriverID = null;
        /*End test specific variables*/

        /* Start specific before and after hooks*/
        beforeEach(function(done){
            primaryDriver = new primaryDriverModel();
            primaryDriverID = primaryDriver._id;
            quote.primaryDriver = [primaryDriverID];
            primaryDriver.save(function(err){
                if(err){
                    return  done(err);
                }
                quote.save(done);
            });
        });
        /* End specific before and after hooks*/

        it('responds with 200 when successful', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/primary_drivers/'+ primaryDriverID)
                .expect(200, done);
        });

        it('responds with 404 when primaryDriver is not found', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/primary_drivers/')
                .expect(404, done);
        });

        it('responds with 500 if primaryDriver Id not provided in url' , function(done){
            request(app)
                .put('/api/quotes/'+ quoteID +'/primary_drivers/'+ null)
                .expect(500, done);
        });

        it('responds with an Content-Type json', function(done) {
            request(app)
                .put('/api/quotes/'+ quoteID + '/primary_drivers/'+ primaryDriverID)
                .expect('Content-Type', /json/, done);
        });

        it('responds with the additional Driver with a matching _id', function(done){
            request(app)
                .put('/api/quotes/'+ quoteID +'/primary_drivers/'+ primaryDriverID)
                .send({})
                .end(function(err, res){
                    if(err){
                        return done(err);
                    }
                    res.body._id.should.equal(primaryDriverID.toString());
                    done();
                })
        });

        it('updates an existing primary Driver', function(done){
            var body = {
                lastName: "Tester"
            };

            request(app)
                .put('/api/quotes/'+ quoteID +'/primary_drivers/'+ primaryDriverID)
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
    /*End unit tests*/
});