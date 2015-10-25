'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  //Begin EZInsure required fields
  productState: {type: String, default: 'FL'},
  agentId: String, //TODO confirm definition
  dnrReason: String, //TODO confirm definition
  requestType: String, //Tells which action to perform QQ - Quick Quote, FQ - Full Quote, POL - Policy
  referenceNumber: String, //TODO confirm definition is this our quoteID?
  productQuoteID: String, //Number provided by EZInsure
  fullQuoteNumber: String, //Number provided by EZInsure
  policyNumber: String, //Number provided by EZInsure
  reqEffDt: String, //   "MM/DD/YYYY" // TODO: pull in from primaryDriver model?
  angularState: String,
  policy_pin: Number,
  primaryDriver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PrimaryDriver'
  },
  additionalDrivers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AdditionalDriver'
  }],
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'

  }],
  underwritings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Underwriting'
  },
  iso: {
    aplusRs: String,
    mvr: String,
    udi: String,
    verifier: String
  },
  //End EZInsure required fields
  //Begin Clutch specific information
  effectiveDate: Date, //Actual effective date set when payment is received or null if policy never bound
  rates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rate'
  }],
  finalRates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Rate'
  }],
  policy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy'
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  schemaVersion: String,
  meta: {
    company: Schema.Types.Mixed,
    stateLog: [],
    quickQuotesPayLoads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'quickQuotePayLoad'
    }],
    fullQuotesPayLoads: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fullQuotePayLoad'
    }]
  }
  //End Clutch specific information
});

QuoteSchema.virtual('created').get( function () {
  if (this["_created"]) return this["_created"];
  return this["_created"] = this._id.getTimestamp();
});

module.exports = mongoose.model('Quote', QuoteSchema);
