'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = primaryDriverModule;

function primaryDriverModule(){
    /*Start exported variables*/
    var model = require('./primaryDriver.model'),
        controller = require('./primaryDriver.controller')(model),
        router = require('./primaryDriver.router')(controller);
    /*End exported variables*/

    //Returned object for export
    var exported =  {
        name: 'primaryDriver',
        model: model,
        controller: controller,
        router: router,
        isReq: true,
        relationship: 'one'
    };

    /*Start local variables for quoteModule*/
    /*End local variables for quoteModule*/

    /*Start exported functions*/
    /*End exported functions*/

    /*Start local functions*/
    /*End local functions*/

    return exported;
}