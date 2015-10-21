'use strict';

var _ = require('lodash');
var Transaction = require('./transaction.model');
var Payment = require('../payment/payment.model');
var request = require('request');
var config = require('../../config/environment');
var messages = require('../../components/messages');


// Get list of transactions
exports.index = function(req, res) {
  Transaction.find(function (err, transactions) {
    if(err) { return handleError(res, err); }
    return res.json(200, transactions);
  });
};

// Get a single transaction
exports.show = function(req, res) {
  Transaction.findById(req.params.id, function (err, transaction) {
    if(err) { return handleError(res, err); }
    if(!transaction) { return res.send(404); }
    return res.json(transaction);
  });
};

// Creates a new transaction in the DB.
//TODO Clean this code; call back city
/**
 * @name create
 * @description creates a transaction
 *  a transaction is synchronous to a charge to plug n pay
 *  saves each call to plug n play success or failure
 *  checks for previous successful charges as to prevent double charging
 * @param req
 * @param res
 * @returns 201 - payment information (Could need to refactor this or change name)
 *          500 - failure occured when calling EZInsure or saving to the DB
 */
exports.create = function(req, res) {
  var payment = {};
  var transaction = new Transaction();
  var orderID = transaction._id.toString().replace(/\D/g,'');

  //Static options for plug'n play service
  //TODO add acct_code to payload, starts with CTH
  var plugnpayInfo = {
    mode: 'auth',
    "publisher-name": config.plugnpay.username,
    "publisher-password": config.plugnpay.password,
    orderID: orderID
  };

  //Merge static code with charge information eg. CC# or Routing#
  var formPayload = _.merge(plugnpayInfo, req.body);

  //Finds payment for the quote ID and populates the previous transactions
  Payment.findById(req.params.paymentID)
    .populate('transactions')
    .exec(function(err, pay){
      if(err) handleError(res, err);
      payment = pay;

      //Prevent multiple charges
      if (payment.successfulOrderId &&
         payment.isComplete &&
         containsSuccessfulTransaction(payment.transactions)) {
        return handleError(res, messages.duplicate);
      }

      // Post the payment to Plug'nPay
      request.post(config.plugnpay.url, {form: formPayload}, handlePlugNPayTrans);
    });

  /**
   * @name handlePlugNPayTrans
   * @description handles information returned from EZInsure
   *  saves transaction and sets proper payment fields based on plugnpay results
   * @param err
   * @param httpResponse
   * @param body
   * @returns 201 - Payment with all transaction results
   *          500 - Failure occured saving transaction or updating payment
   */
  function handlePlugNPayTrans(err, httpResponse, body){
    if(err) return handleError(res, err);

    transaction = _.merge(transaction, uriParamsToJSON(body));

    transaction.save(function(err, transaction) {
      if(err) return handleError(res, err);
      //TODO call policy binding here
      //Payment fields set based on transaction results
      var isComplete = null;
      var successfulOrderId = null;
      var lastTransactionMsg = null;
      var total = null;

      //Sets proper values based on transaction status
      if(transaction.FinalStatus === 'success' && transaction.success === 'yes' && !transaction.Duplicate){
        isComplete = true;
        successfulOrderId = orderID;
        lastTransactionMsg = messages.success;
        total = transaction.amountcharged;
      } else {
        isComplete = false;
        if (transaction.FinalStatus === 'problem') lastTransactionMsg = transaction["auth-msg"];
        if (transaction.FinalStatus === 'pending') lastTransactionMsg = messages.pending;
        if (transaction.Duplicate === 'yes') lastTransactionMsg = messages.duplicate;
      }

      //Payment update options for mongoose
      var updates = {
        $push: {'transactions': transaction},
        isComplete: isComplete,
        successfulOrderId: successfulOrderId,
        lastTransactionMsg: lastTransactionMsg
      };

      Payment.findByIdAndUpdate( req.params.paymentID, updates)
        .populate('transactions')
        .exec(function(err, payment){
          if(err) handleError(res, err);
          return res.json(201, payment )
        }
      )
    });

  }
};


/**
 * @name containsSuccessfulTransaction
 * @description searches transaction array for a success
 * @param transactions
 * @returns boolean
 */
function containsSuccessfulTransaction(transactions){
  var successfulTransArr = transactions.filter(function(transaction){
    return transaction.FinalStatus === "success"
  });

  return successfulTransArr.length !== 0
}

/**
 * @name uriParamsToJSON
 * @description converst uriParam string to JSON
 * @param string
 * @returns Object
 */
function uriParamsToJSON(string){
  var decodedString = decodeURIComponent(string);
  var paramArr = decodedString.split('&').map(function(pair){return pair.split('=');});
  return _.zipObject(paramArr);
}

function handleError(res, err) {
  return res.send(500, err);
}
