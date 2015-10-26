/**
 * Created by jlillz on 10/25/15.
 */
'use strict';
/*Start imported modules*/
var request = require('request');
var _ = require('lodash');
var vehicleUtil = require('../utils/vehicle.util');
/*End imported modules*/

module.exports = ezVehicleCtrl();

function ezVehicleCtrl(){
  /*Start exported variables*/
  /*End exported variables*/

  //Exported object
  var exported = {
    getYears: getYears,
    getMakesByYear: getMakesByYear,
    getModelsByYearMake: getModelsByYearMake,
    getTrimsByYearMakeModel: getTrimsByYearMakeModel
  };

  /*Start local variables for ezVehicleCtrl*/
  /*End local variables for ezVehicleCtrl*/

  /*Start exported functions*/
  /**
   * @name getYears
   * @description calls EZInsure API interface to get a list of years supported by windhaven
   * @param req
   * @param res
   * @returns HttpResponse
   *   200 - Array of years as strings
   *   500 - An error occurred when calling EZInsure
   */
  function getYears(req, res){
    var path = 'vehicles/v1/years';
    callEZ(res, path);
  }

  /**
   * @name getMakesByYear
   * @description calls EZInsure API interface to get a list of makes supported by windhaven for a given year
   * @param req
   * @param res
   * @returns HttpResponse
   *   200 - Array of make names as strings
   *   500 - An error occurred when calling EZInsure
   */
  function getMakesByYear(req, res){
    var path = 'vehicles/v1/makes/' + req.params.year;
    callEZ(res, path);
  }

  /**
   * @name getModelsByYearMake
   * @description calls EZInsure API interface to get a list of models supported by windhaven for a given year and make
   * @param req
   *  req.params = { year: XXXX, make: 'XXXXXXXXX' }
   * @param res
   * @returns HttpResponse
   *   200 - Array of model names as strings
   *   500 - An error occurred when calling EZInsure
   */
  function getModelsByYearMake(req, res){
    //Translate makes name into four letter code for EZInsure eg. Acura -> ACUR
    var make = vehicleUtil.translateMakeNameToCode(req.params.make);
    var path = 'vehicles/v1/models/' + req.params.year + '/' + make;
    callEZ(res, path);
  };

  /**
   * @name getTrimsByYearMakeModel
   * @description calls EZInsure API interface to get a list of trims supported by windhaven for a given year and make
   *  The trims will have Objects containing information needed about each specific vehicle combination
   *  eg. subModel (integer key used by EZInsure), weight(used to set business rule)
   * @param req
   *  req.params = { year: XXXX, make: 'XXXXXXXXX', model: 'XXXXXXX' }
   * @param res
   * @returns HttpResponse
   *  200 - JSONArray of trims with corresponding object
   *  500 - An error occurred when calling EZInsure
   */
  function getTrimsByYearMakeModel(req, res){
    console.log('req: ', req);
    //Translate makes name into four letter code for EZInsure eg. Acura -> ACUR
    var make = vehicleUtil.translateMakeNameToCode(req.params.make);
    var path = 'vehicles/v1/trims/' + req.params.year + '/' + make + '/' + req.params.model;
    callEZ(res, path);
  };

  /*End exported functions*/

  /*Start local functions*/
  /**
   * @name = callEZ
   * @param res
   * @param path
   * @description
   *  Uses request to make a call to EZInsure; Currently only supports GET requests
   *  Could expand to merge optional options
   *  The call to EZInsure simply returns the json returned from EZInsure
   * @return N/A
   */
  function callEZ(res, path){
    //TODO Add ez provider to config file and read from there
    var options = {
      url: 'http://ezinsureuat.windhaveninsurance.com/clutch/api/'+path,
      method: 'GET'
    };

    function callback(err, response, body) {
      if(err) handleError(res, err);
      var response = JSON.parse(body);

      //Checks to convert model keys when looking for models
      var whatToGet = path.split('/')[2];
      if(whatToGet === 'makes') response = vehicleUtil.translateMakeCodeArrToNameArr(response);
      if(whatToGet === 'vin') response[0].make = vehicleUtil.translateMakeCodeToName(response[0].make);
      console.log("-------------calling eZ", response );
      res.status(200).json(response);
    }

    request(options, callback);
  }

  function handleError(res, err) {
    return res.send(500, err);
  }
  /*End local functions*/

  return exported;
}
