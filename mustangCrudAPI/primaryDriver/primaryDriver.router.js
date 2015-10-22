'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/


module.exports = primaryDriverRouter;

function primaryDriverRouter(controller){
  /*Start exported variables*/
  var router = express.Router();
  /*End exported variables*/

  /*Start local variables*/
  var primaryDriverCtrl = controller;
  /*Start local variables*/

  /*Start router configuration*/
  router.get('/:id', primaryDriverCtrl.show);
  router.post('/', primaryDriverCtrl.create);
  router.put('/:id', primaryDriverCtrl.update);
  /*End router configuration*/

  return router;
}


