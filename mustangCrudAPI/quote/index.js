'use strict';

var express = require('express'),
  quoteCtrl = require('./quote.controller'),
  //primaryDriverCtrl = require('../primaryDriver/primaryDriver.controller')
  ratesCtrl = require('../rate/rate.controller'),
  transactionCtrl = require('../transaction/transaction.controller');

var PrimaryDriverModule = require('../primaryDriver/primaryDriver.index'),
    PrimaryDriver = new PrimaryDriverModule(),
    primaryDriverCtrl = PrimaryDriver.controller;
var VehicleModule = require('../vehicle/vehicle.index'),
    Vehicle = new VehicleModule(),
    vehicleCtrl = Vehicle.controller;
var AdditionalDriverModule = require('../additionalDriver/additionalDriver.index'),
    AdditionalDriver = new AdditionalDriverModule(),
    additionalDriverCtrl = AdditionalDriver.controller;
var underwritingModule = require('../underwriting/underwriting.index'),
  Underwriting = new underwritingModule(),
  underwritingCtrl = Underwriting.controller;
var PaymentModule = require('../payment/payment.index'),
    Payment = new PaymentModule(),
    paymentCtrl = Payment.controller;
var PolicyModule = require('../policy/policy.index'),
  Policy = new PolicyModule(),
  PolicyCtrl = Policy.controller;

var router = express.Router();

router.get('/', quoteCtrl.index);
router.post('/', quoteCtrl.create);
router.put('/:id', quoteCtrl.update);
router.get('/:id', quoteCtrl.show);

router.get('/:id/populated', populatedQuote);
var Quote = require('./quote.model');
function populatedQuote(req, res){
  var quoteID = req.params.id,
    populateStr = 'primaryDriver additionalDrivers vehicles rates finalRates underwriting payment transaction policy';

  Quote.findById(quoteID)
    .populate(populateStr)
    .exec(function(err, quote){
      res.json(200, quote);
    });
}


router.get('/:quoteID/payments/:id/populated', populatedPayment);
function populatedPayment(req, res){
  var quoteID = req.params.quoteID,
    paymentID = req.params.id,
    populateStr = 'transactions';

  Payment.model.findById(paymentID)
    .populate(populateStr)
    .exec(function(err, payment){
      res.json(200, payment);
    });
}


router.get('/:quoteID/qq_payload/:id', function(req, res){
  var quoteID = req.params.quoteID;
  var qq_id = req.params.id;
  var QuickQuotePayload = require('./meta/quickQuote.model');
  QuickQuotePayload.findById(qq_id)
    .exec(function(err, payload){
      res.json(200, payload)
    })
});
router.get('/:quoteID/fq_payload/:id', function(req, res){
  var quoteID = req.params.quoteID;
  var fq_id = req.params.id;
  var FullQuotePayload = require('./meta/fullQuote.model');
  FullQuotePayload.findById(fq_id)
    .exec(function(err, payload){
      res.json(200, payload)
    })
})

// All drivers routes
router.get('/:quoteID/drivers', function(req, res){
  drivers = {
    primaryDriver: {firstName: 'bobby', middleName: 'fisher'},
    additionalDrivers: []
  }
  res.json(drivers)
})
//Primary driver routes
//There is no index function because of the one to one relationship with quote
//There is also no delete function since there should always be a primary driver
router.get('/:quoteID/drivers/primary', primaryDriverCtrl.show);
router.post('/:quoteID/drivers/primary', primaryDriverCtrl.create);
router.put('/:quoteID/drivers/primary', primaryDriverCtrl.update);

//Additional driver routes
router.get('/:quoteID/drivers/additional', additionalDriverCtrl.index);
router.post('/:quoteID/drivers/additional', additionalDriverCtrl.create);
router.put('/:quoteID/drivers/additional/:id', additionalDriverCtrl.update);
router.delete('/:quoteID/drivers/additional/:id', additionalDriverCtrl.destroy);

//Vehicles routes
router.get('/:quoteID/vehicles', vehicleCtrl.index);
router.post('/:quoteID/vehicles', vehicleCtrl.create);
router.put('/:quoteID/vehicles/:id', vehicleCtrl.update);
router.delete('/:quoteID/vehicles/:id', vehicleCtrl.destroy);

//Rate routes
//There is no index function because of the one to one relationship with quote
//There is also no delete function since there should always be a primary driver
router.get('/:quoteID/rates', ratesCtrl.index);
router.post('/:quoteID/rates', ratesCtrl.create);
router.put('/:quoteID/rates/:id', ratesCtrl.update);

//Underwriting routes
//There is no index function because of the one to one relationship with quote
//There is also no delete function since there should always be underwriting questions
router.get('/:quoteID/underwritings/:id', underwritingCtrl.show);
router.post('/:quoteID/underwritings', underwritingCtrl.create);
router.put('/:quoteID/underwritings/:id', underwritingCtrl.update);

//Payment routes
//There is no index function because of the one to one relationship with quote
//There is also no delete function since there should always be a payment
router.get('/:quoteID/payments/:id', paymentCtrl.show);
router.post('/:quoteID/payments', paymentCtrl.create);
router.put('/:quoteID/payments/:id', paymentCtrl.update);
router.post('/:quoteID/payments/:paymentID/transactions', transactionCtrl.create);



module.exports = router;
