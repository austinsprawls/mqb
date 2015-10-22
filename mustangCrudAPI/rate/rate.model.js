'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RateSchema = new Schema({
  _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote' },
  productQuoteID: String, //TODO remove the t when EZInsure fixes theirs
  name: String,
  messages: Schema.Types.Mixed,
  programs: Schema.Types.Mixed
},{
  strict: false
});

module.exports = mongoose.model('Rate', RateSchema);

