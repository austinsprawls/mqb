'use strict';
/*Start imported npm modules*/
/*End imported npm modules*/
module.exports = additionalDriverModule;

function additionalDriverModule(){
    /*Start exported variables*/
    var model = require('./additionalDriver.model'),
        controller = require('./additionalDriver.controller')(model),
        router = require('./additionalDriver.router')(controller);
    /*End exported variables*/

    //Returned object for export
    var exported = {
        name: 'additionalDrivers',
        model: model,
        controller: controller,
        router: router,
        isReq: false,
        relationship: 'many'
    };

    /*Start local variables for quoteModule*/
    /*End local variables for quoteModule*/

    /*Start exported functions*/
    /*End exported functions*/

    /*Start local functions*/
    /*End local functions*/

    return exported;
}



/*
 Each relationship module requires
 * name - name of module; convention: many relationship is plural, one is singular
 * model - the model for the module
 * controller - the controller for the module; exports functions used by routes
 * router - the router for the module; configures express routes
 * isReq - (true, false) tells if the relationship is required by quote
 * relationship - (many, one) relationship to quote; all quotes are One to One or One to Many
 */
/* All modules should start with the same skeleton */
// 'use strict';
///*Start imported npm modules*/
///*End imported npm modules*/
// module.exports = moduleNameComponentName;  eg. quoteCtrl, quoteModule, quoteRouter
//
// function moduleNameComponentName(argIfAny){
// /*Start exported variables*/
///*End exported variables*/
//
////Exported object
//var exported = {
//    name: '',
//    model: model,
//    controller: controller,
//    router: router,
//    isReq: false,
//    relationship: ''
//};
//
///*Start local variables for moduleNameComponentName*/
///*End local variables for moduleNameComponentName*/
//
///*Start exported functions*/
///*End exported functions*/
//
///*Start local functions*/
///*End local functions*/
//
// return exported
//}
/* end module skeleton*/