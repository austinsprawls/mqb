'use strict';
/*Start imported npm modules*/
var express = require('express');
/*End imported npm modules*/

module.exports = additionalDriverRouter;

function additionalDriverRouter(controller){
    /*Start exported variables*/
    var router = express.Router();
    /*End exported variables*/

    /*Start local variables*/
    var additionalDriverCtrl = controller;
    /*End local variables*/

    /*Start router configuration*/
    router.get('/', additionalDriverCtrl.index);
    router.post('/', additionalDriverCtrl.create);
    router.put('/:id', additionalDriverCtrl.update);
    router.delete('/:id', additionalDriverCtrl.destroy);
    /*End router configuration*/

    return router;
}






