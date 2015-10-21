/**
 * Created by jlillz on 10/16/15.
 */
'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/


module.exports = policyRouter;

function policyRouter(controller){
  /*Start exported variables*/
  var router = express.Router();
  /*End exported variables*/

  /*Start local variables*/
  var policyCtrl = controller;
  /*Start local variables*/

  /*Start router configuration*/
  router.get('/:id', policyCtrl.show);
  /*End router configuration*/

  return router;
}


