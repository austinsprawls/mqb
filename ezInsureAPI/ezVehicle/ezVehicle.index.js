/**
 * Created by jlillz on 10/25/15.
 */
'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = ezVehicleModule;

function ezVehicleModule(optParentRouter){
  /*Start exported variables*/
  var controller = require('./ezVehicle.controller'),
    router = require('./ezVehicle.router')(controller, optParentRouter);
  /*End exported variables*/

  //Returned object for export
  var exported = {
    name: 'ezVehicleModule',
    controller: controller,
    router: router
  };

  /*Start local variables for ezVehicleModule*/
  /*End local variables for ezVehicleModule*/

  /*Start exported functions*/
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}
