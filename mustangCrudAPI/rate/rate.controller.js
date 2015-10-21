'use strict';

var _ = require( 'lodash' );
var Rate = require( './rate.model' );
var Quote = require('../quote/quote.model.js');
var Q = require('q');
// LOCAL
var logger = require('../../utils/logger')
// END LOCAL
//TODO

//Get all rates for a quote
exports.index = function(req, res){
  Quote.findById(req.params.quoteID)
    .select('rates')
    .populate('rates')
    .exec(handleQuote);

  function handleQuote(err, quote){
    if(err) return handleError(res, err);
    if(!quote) return res.send( 404 );
    return res.json(200, quote.rates)
  }
};

// Creates a new rate in the DB.
exports.create = function(req, res) {
  console.log("creating rate");
  var data = req.body;
  data._quoteID = req.params.quoteID;
  Rate.create(data, handleRate);

  function handleRate(err, rate) {
    if (err) return handleError(res, err);
    Quote.update( {_id: rate._quoteID}, {$push: {'rates': rate._id}}, handleQuote);
  }

  function handleQuote(err, quote){
    if(err){ handleError(res, err); }
    return res.json( 201, quote.rates );
  }
};

exports.updateEZRates = function(data) {
  var deferred = Q.defer();
  logger.debug("rate.controller: updateEZRates: data: ", data);
  Rate.create(data, handleRate);

  function handleRate(err, rate) {
    console.log("handling Rate", JSON.parse(JSON.stringify(rate)));
    if (err) deferred.reject(err);
    //TODO remove when EZInsure fixes typo 'programtQuoteID'
    var productQuoteID = rate.productQuoteID || rate.programtQuoteID;
    Quote.update( {_id: rate._quoteID}, {$push: {'rates': rate._id}, 'productQuoteID': productQuoteID}, handleQuote);
  }

  function handleQuote(err, quote){
    console.log("EZ Save quote: ", quote);
    if(err) deferred.reject(err);
    else deferred.resolve();
  }
  return deferred.promise;
};

exports.updateFinalEZRates = function(data) {
  var deferred = Q.defer();
  console.log("data: ", data);
  Rate.create(data, handleRate);

  function handleRate(err, rate) {
    console.log("handling Rate", rate);
    if (err) deferred.reject(err);
    //TODO remove when EZInsure fixes typo 'programtQuoteID'
    var productQuoteID = rate.productQuoteID || rate.programtQuoteID;
    Quote.update( {_id: rate._quoteID}, {$push: {'finalRates': rate._id}, 'fullQuoteNumber': productQuoteID}, handleQuote);
  }

  function handleQuote(err, quote){
    console.log("EZ Final Save quote: ", quote);
    if(err) deferred.reject(err);
    else deferred.resolve();
  }
  return deferred.promise;
};

// Updates an existing rate in the DB.
exports.update = function(req, res) {
  if(req.body._id) delete req.body._id;
  return Rate.findById(req.params.id, handleRate);

  function handleRate(err, rate){
    if (err) return handleError( res, err );
    if(!rate) return res.send( 404 );

    var updated = _.merge(rate, req.body);
    updated.save( function (err) {
      if ( err ) return handleError( res, err );
      return res.json( 200, rate );
    });
  }
};


function handleError(res, err) {
  return res.send(500, err);
}
