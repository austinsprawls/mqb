 'use strict';
 /*Start imported npm modules*/
 var _ = require('lodash');
 var crudUtil = require('../utils/crud.util');
 /*End imported npm modules*/

 module.exports = vehicleCtrl;

 function vehicleCtrl(model){
     /*Start exported variables*/
     /*End exported variables*/

     //Exported object
     var exported = {
         index: index,
         create: create,
         update: update,
         destroy: destroy
     };

     /*Start local variables for paymentCtrl*/
     var Quote = require('../quote/quote.model.js');
     /*End local variables for paymentCtrl*/

     /*Start exported functions*/
     function index(){
         var indexData = {
             parentModel: Quote,
             parentID: req.params.quoteID,
             parentKey: 'vehicles'
         };
         crudUtil.index.child(indexData);
     }

     function create() {
         req.body._quoteID = req.params.quoteID;
         var createData = {
             childInfo: req.body,
             childModel: model,
             parentModel: Quote,
             parentID: req.params.quoteID,
             parentKey: 'vehicles',
             isArray: true
         };
         crudUtil.create.child(createData);
     }

     function update() {
         var updateData = {
             model: model,
             info: req.body,
             id: req.params.id
         };
         crudUtil.update(updateData);
     }

     function destroy() {
         var destroyData = {
             childModel: model,
             childID: req.params.id,
             parentModel: Quote,
             parentID: req.params.quoteID,
             parentKey: 'vehicles'
         };
         crudUtil.destroy.child(destroyData);
     }
     /*End exported functions*/

     /*Start local functions*/
     /*End local functions*/

     return exported;
 }
