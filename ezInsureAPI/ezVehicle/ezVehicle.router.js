/**
 * Created by jlillz on 10/25/15.
 */
'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/

module.exports = ezVehicleRouter;

function ezVehicleRouter(controller, optParentRouter){
  /*Start exported variables*/
  var optParentRouter = optParentRouter || express.Router();
  /*End exported variables*/

  /*Start local variables*/
  var ezVehicleCtrl = controller;
  var mainPath = '/vehicles/v1';
  /*End local variables*/

  /*Start router configuration*/
  optParentRouter.get(mainPath + '/years', ezVehicleCtrl.getYears);
  optParentRouter.get(mainPath + '/makes/:year', ezVehicleCtrl.getMakesByYear);
  optParentRouter.get(mainPath + '/models/:year/:make', ezVehicleCtrl.getModelsByYearMake);
  optParentRouter.get(mainPath + '/trims/:year/:make/:model', ezVehicleCtrl.getTrimsByYearMakeModel);
  /*End router configuration*/

  return optParentRouter;
}
