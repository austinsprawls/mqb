'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/


module.exports = vehicleRouter;

function vehicleRouter(controller){
    /*Start exported variables*/
    var router = express.Router();
    /*End exported variables*/

    /*Start local variables*/
    var vehicleCtrl = controller;
    /*End local variables*/

    /*Start router configuration*/
    router.get('/:quoteID/vehicles', vehicleCtrl.index);
    router.post('/:quoteID/vehicles', vehicleCtrl.create);
    router.put('/:quoteID/vehicles/:id', vehicleCtrl.update);
    router.delete('/:quoteID/vehicles/:id', vehicleCtrl.destroy);
    /*End router configuration*/

    return router;
}