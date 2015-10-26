/**
 * Created by jlillz on 10/25/15.
 */
'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/

module.exports = ezInsureModule();

function ezInsureModule(){
  /*Start exported variables*/
  var router = require('./ezInsure.router');
  /*End exported variables*/

  /*Start instantiate local iso modules*/
  var ezVehicleModule = require('./ezVehicle/ezVehicle.index')(router);
  /*End instantiate local iso modules*/

  //Returned object for export
  var exported = {
    name: 'ezInsureModule',
    router: router,
    childModules: {
      ezVehicleModule: ezVehicleModule
    }
  };

  /*Start local variables for ezInsureModule*/
  /*End local variables for ezInsureModule*/

  /*Start exported functions*/
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}
