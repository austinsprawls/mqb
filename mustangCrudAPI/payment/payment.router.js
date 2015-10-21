'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/


module.exports = paymentRouter;

function paymentRouter(controller){
    /*Start exported variables*/
    var router = express.Router();
    /*End exported variables*/

    /*Start local variables*/
    var paymentCtrl = controller;
    /*Start local variables*/

    /*Start router configuration*/
    router.get('/:id', paymentCtrl.show);
    router.post('/', paymentCtrl.create);
    router.put('/:id', paymentCtrl.update);
    /*End router configuration*/

    return router;
}