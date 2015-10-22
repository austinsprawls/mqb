/**
 * Created by jlillz on 10/16/15.
 */
'use strict';
/*Start imported npm modules*/
var mongoose = require('mongoose');
/*End imported npm modules*/

module.exports = policyModel();

function policyModel(){
  /*Start exported variables*/
  /*End exported variables*/

  /*Start local variables*/
  var Schema = mongoose.Schema;
  /*End local variables*/

  /*Start schema configuration*/
  var PolicySchema = new Schema({
    _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote' },
    policyNumber: String,
    esignURL: String,
    messages: Schema.Types.Mixed
  },{
    strict: false
  });
  /*End schema configuration*/

  /*Start schema instance methods*/
  /*End schema instance methods*/

  /*Start schema static methods*/
  /*End schema static methods*/

  /*Start private functions*/
  /*End private functions*/

  return mongoose.model('Policy', PolicySchema);
}
