/**
 * Created by jlillz on 10/16/15.
 */
'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
var crudUtil = require('../utils/crud.util');
/*End imported npm modules*/

module.exports = primaryDriverCtrl;

function primaryDriverCtrl(model){
  /*Start exported variables*/
  /*End exported variables*/

  //Exported object
  var exported = {
    show: show
  };

  /*Start local variables for primaryDriverCtrl*/
  var Quote = require('../quote/quote.model');
  /*End local variables for primaryDriverCtrl*/

  /*Start exported functions*/
  function show(req, res) {
    var showData = {
      model: model,
      id: req.params.id,
      res: res
    };
    crudUtil.show(showData);
  }
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}

