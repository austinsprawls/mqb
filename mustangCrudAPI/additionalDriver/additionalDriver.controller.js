'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
var crudUtil = require('../utils/crud.util');
/*End imported npm modules*/

module.exports = additionalDriverCtrl;

function additionalDriverCtrl(model){
    /*Start exported variables*/
    /*End exported variables*/

    //Exported object
    var exported = {
        index: index,
        create: create,
        update: update,
        destroy: destroy
    };

    /*Start local variables for additionalDriverCtrl*/
    var Quote = require('../quote/quote.model');
    /*End local variables for additionalDriverCtrl*/

    /*Start exported functions*/
    function index(req, res){
        var indexData = {
            parentModel: Quote,
            parentID: req.params.quoteID,
            parentKey: 'additionalDrivers',
            res: res
        };
        crudUtil.index.child(indexData);
    }

    function create(req, res) {
        req.body._quoteID = req.params.quoteID;
        var createData = {
            childInfo: req.body,
            childModel: model,
            parentModel: Quote,
            parentID: req.params.quoteID,
            parentKey: 'additionalDrivers',
            isArray: true,
            res: res
        };
        crudUtil.create.child(createData);
    }

    function update(req, res) {
        console.log('req.body', req.body)
        //if (req.body.dob !== undefined){
        //  var convertDate = new Date(req.body.dob);
        //  convertDate.getconvertDate.getFullYear() + '/'
        //}
        var updateData = {
            model: model,
            info: req.body,
            id: req.params.id,
            res: res,
            containsArray: true,
            arrayKeys: ['violationsArray']
        };
        crudUtil.update(updateData);
    }

    function destroy(req, res) {
        var destroyData = {
            childModel: model,
            childID: req.params.id,
            parentModel: Quote,
            parentID: req.params.quoteID,
            parentKey: 'additionalDrivers',
            res: res
        };
        crudUtil.destroy.child(destroyData);
    }
    /*End exported functions*/

    /*Start local functions*/
    /*End local functions*/

    return exported;
}

