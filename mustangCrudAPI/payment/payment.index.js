'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = paymentModule;

function paymentModule(){
    /*Start exported variables*/
    var model = require('./payment.model'),
        controller = require('./payment.controller')(model),
        router = require('./payment.router')(controller);
    /*End exported variables*/

    //Returned object for export
    var exported = {
        name: 'payment',
        model: model,
        controller: controller,
        router: router,
        isReq: true,
        relationship: 'one'
    };

    /*Start local variables for paymentModule*/
    /*End local variables for paymentModule*/

    /*Start exported functions*/
    /*End exported functions*/

    /*Start local functions*/
    /*End local functions*/

    return exported;
}