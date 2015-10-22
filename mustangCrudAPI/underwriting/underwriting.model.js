'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UnderwritingSchema = new Schema({
  _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote'},
  answers: [
    {
      "questionCd": String,
      "yesNoCd": Boolean,
      "explanation": {type: String, default: ''}
    }
  ]
});

module.exports = mongoose.model('Underwriting', UnderwritingSchema);
