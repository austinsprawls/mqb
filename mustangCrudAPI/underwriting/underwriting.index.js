'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = underwritingModule;

function underwritingModule(){
  /*Start exported variables*/
  var model = require('./underwriting.model'),
    controller = require('./underwriting.controller')(model),
    router = require('./underwriting.router')(controller);
  /*End exported variables*/

  //Returned object for export
  var exported = {
    name: 'underwriting',
    model: model,
    controller: controller,
    router: router,
    isReq: true,
    relationship: 'one'
  };

  /*Start local variables for moduleNameModule*/
  /*End local variables for moduleNameModule*/

  /*Start exported functions*/
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}
