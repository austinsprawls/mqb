/**
 * Created by jlillz on 10/16/15.
 */
'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = policyModule;

function policyModule(){
  /*Start exported variables*/
  var model = require('./policy.model'),
    controller = require('./policy.controller')(model),
    router = require('./policy.router')(controller);
  /*End exported variables*/

  //Returned object for export
  var exported =  {
    name: 'policy',
    model: model,
    controller: controller,
    router: router,
    isReq: true,
    relationship: 'one'
  };

  /*Start local variables for quoteModule*/
  /*End local variables for quoteModule*/

  /*Start exported functions*/
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}
