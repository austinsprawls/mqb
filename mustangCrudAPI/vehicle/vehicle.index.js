'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = vehicleModule;

function vehicleModule(){
    /*Start exported variables*/
    var model = require('./vehicle.model'),
        controller = require('./vehicle.controller')(model),
        router = require('./vehicle.router')(controller);
    /*End exported variables*/

    //Exported object
    var exported = {
        name: 'vehicles',
        model: model,
        controller: controller,
        router: router,
        isReq: true,
        relationship: 'many'
    };

    /*Start local variables for vehicleModule*/
    /*End local variables for vehicleModule*/

    /*Start exported functions*/
    /*End exported functions*/

    /*Start local functions*/
    /*End local functions*/

    return exported;
}
