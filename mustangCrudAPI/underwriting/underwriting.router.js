'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/


module.exports = underwritingRouter;

function underwritingRouter(controller){
  /*Start exported variables*/
  var router = express.Router();
  /*End exported variables*/

  /*Start local variables*/
  var underwritingController = controller;
  /*Start local variables*/

  /*Start router configuration*/
  router.get('/:id', underwritingController.show);
  router.post('/', underwritingController.create);
  router.put('/:id', underwritingController.update);
  /*End router configuration*/

  return router;
}
