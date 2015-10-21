'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
var crudUtil = require('../utils/crud.util');
/*End imported npm modules*/

module.exports = underwritingCtrl;

function underwritingCtrl(model){
  /*Start exported variables*/
  /*End exported variables*/

  //Exported object
  var exported = {
    show: show,
    create: create,
    update: update
  };

  /*Start local variables for underwritingCtrl*/
  var Quote = require('../quote/quote.model.js');
  /*End local variables for underwritingCtrl*/

  /*Start exported functions*/
  function show(req, res) {
    var showData = {
      model: model,
      id: req.params.id,
      res: res
    };
    crudUtil.show(showData);
  }

  function create(req, res) {
    req.body._quoteID = req.params.quoteID;
    var createData = {
      childInfo: {
        _quoteID: req.params.quoteID
      },
      childModel: model,
      parentModel: Quote,
      parentID: req.params.quoteID,
      parentKey: 'underwritings',
      res: res
    };
    crudUtil.create.child(createData);
  }

  function update(req, res) {
    var updateData = {
      model: model,
      info: req.body,
      id: req.params.id,
      res: res
    };
    crudUtil.update(updateData);
  }
  /*End exported functions*/

  /*Start local functions*/
  /*End local functions*/

  return exported;
}


function handleError(res, err) {
  return res.send(500, err);
}
