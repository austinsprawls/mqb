'use strict';
//TODO go through each module and capitalize model name
var _ = require('lodash');
var Quote = require('./quote.model'),
  PrimaryDriver = require('../primaryDriver/primaryDriver.model'),
  Vehicle = require('../vehicle/vehicle.model'),
  Rate = require('../rate/rate.model'),
  Underwriting = require('../underwriting/underwriting.model'),
  Payment = require('../payment/payment.model');
var Q = require('q');

//// Get list of quotes
exports.index = function(req, res) {
  Quote.find(function (err, quotes) {
    if(err) { return handleError(res, err); }
    return res.json(200, quotes);
  });
};




/**
 * @exported function
 * @name: create()
 * @descriptions: exported function
 *   Creates a new quote in the DB.
 *   Creates all must have relationships: PrimaryDriver,
 *   Vehicle, Underwriting,  and Payment in that order
 *   Saves the updated quote filled with each newly created relationship
 * @param req: http request information
 * @param res: http response information
 * @returns: HttpResponse
 *   200 - Array of model names as strings
 *   500 - An error occurred when calling EZInsure
 */
exports.create = function(req, res) {
  //Create new quote, but does not save, to generate mongoose _id
  var quote = new Quote(req.body);

  createDefaultRelationships(quote).then(function(quoteArr){
    quote = quoteArr[quoteArr.length-1];
    quote.save(function(err, quote) {
      if(err) return handleError(res, err);

      return res.json(201, quote);
      })
  });

};

function createDefaultRelationships(quote){
  var promiseArr = [];
  var quoteID = quote._id;
  var defaultRelationships = [
    {quoteField: 'primaryDriver', model: PrimaryDriver},
    {quoteField: 'vehicles', model: Vehicle},
    {quoteField: 'underwritings', model: Underwriting},
    {quoteField: 'payment', model: Payment}
  ];

  defaultRelationships.forEach(function(relationship){
    var deferred = Q.defer();

    relationship.model.create({_quoteID: quoteID}, function(err, result){
      if(err) return handleError(res, err);
      quote[relationship.quoteField] = result._id;
      deferred.resolve(quote);
    });
    promiseArr.push(deferred.promise);
  });

  return Q.all(promiseArr);
}

// Get a single quote
exports.show = function(req, res) {
  //console.log("FETCHING QUOTE: ", req.params.id);
  //performs a db query to return the quote given the provided id
  //handles and returns errors
  //returns quote in json format when no errors occur
  Quote.findById(req.params.id)
    .exec(function (err, quote) {
    if(err) {
      return handleError(res, err);
    }
    if(!quote) {
      return res.send(404, "Quote not found.");
    }
    //console.log("Quote Fetched: ", quote);
    return res.json(quote);
  });
};


function handleError(res, err) {
  return res.send(500, err);
}

// Updates an existing quote in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Quote.findById(req.params.id, function (err, quote) {
    if (err) { return handleError(res, err); }
    if(!quote) { return res.send(404); }

    var updated = _.merge(quote, req.body);

    if(req.body.angularState){
      var stateLog = quote.meta.stateLog;
      stateLog.push(req.body.angularState);
      updated.meta.stateLog = stateLog;
    }

    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, quote);
    });
  });
};
//
//// Deletes a quote from the DB.
//exports.destroy = function(req, res) {
//  Quote.findById(req.params.id, function (err, quote) {
//    if(err) { return handleError(res, err); }
//    if(!quote) { return res.send(404); }
//    quote.remove(function(err) {
//      if(err) { return handleError(res, err); }
//      return res.send(204);
//    });
//  });
//};
//

