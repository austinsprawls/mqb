/**
 * Created by jmunsch on 10/24/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher'
import ActionTypes from '../constants/ActionTypes'
//import mustangCrud from '../../mustangCrudAPI/quote'
import restUtil from '../utils/restUtil.js';

/**
 * driversService
 * Purpose: Provide CRUD operations for Driver resource
 * @param PrimaryDriver
 * @param AdditionalDriver
 * @param Quote
 * @returns {{createAdditionalDriver: driversService.createAdditionalDriver,
   * getAdditionalDrivers: driversService.getAdditionalDrivers,
   * getPrimaryDriver: driversService.getPrimaryDriver,
   * removeAdditionalDriver: driversService.removeAdditionalDriver,
   * updatePrimaryDriver: driversService.updatePrimaryDriver,
   * updateAdditionalDriver: driversService.updateAdditionalDriver}}
 */
function DriversActions() {
  console.log(arguments)
  var Quote = {
    params: {
      quoteId: 'someIdHere'
    }
  }
  var driverCount = 0;
  return {
    createAdditionalDriver: createAdditionalDriver,
    getAdditionalDrivers: getAdditionalDrivers,
    getPrimaryDriver: getPrimaryDriver,
    removeAdditionalDriver: removeAdditionalDriver,
    updatePrimaryDriver: updatePrimaryDriver,
    updateAdditionalDriver: updateAdditionalDriver
  };

  /**
   * @name driversService.createAdditionalDriver
   * @returns {*}
   * @description calls AdditionalDriver resource to create new driver instance and then saves it to DB
   */
  function createAdditionalDriver() {
    //var newDriver = new AdditionalDriver();
    //return AdditionalDriver.save({quoteId: Quote.quoteId}, newDriver);
    //mustangCrud.additionalDrivers.create().then(function(newDriver) {
    var newDriver = {
      firstName: '',
      middleName: '',
      lastName: '',
      suffixName: '',
      _id: ++driverCount
    }
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_ADDITIONAL_DRIVER,
      additionalDriver: newDriver
    });
    //});
  }
  //  index: index,
  //  create: create,
  //  update: update,
  //  destroy: destroy
  /**
   * @name driversService.getAdditionalDrivers
   * @description calls AdditionalDriver resource to fetch all additional drivers
   * @returns {*}
   */
  function getAdditionalDrivers() {
    mustangCrud.additionalDriver.index().then(function(driver) {
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_ADDITIONAL_DRIVER,
        additionalDriver: driver
      });
    });
  }

  /**
   * @name driversService.getPrimaryDriver
   * @description calls PrimaryDriver resource to fetch a single Primary Driver belonging to the quote
   * @returns {*}
   */
  function getPrimaryDriver() {
    if (!Quote.primaryDriverId) return false;
    return mustangCrud.additionalDriver.index({quoteId: Quote.quoteId, primaryDriverId: Quote.primaryDriverId});
  }

  /**
   * @name driversService.removeAdditionalDriver
   * @description calls Additional Driver resource to fetch driver by its _id and then remove from DB
   * @param driver_id
   * @returns {*}
   */
  function removeAdditionalDriver(driver_id) {
    return AdditionalDriver.remove({quoteId: Quote.quoteId, additionalDriverId: driver_id});
  }

  /**
   * @name driversService.updatePrimaryDriver
   * @description calls PrimaryDriver resource to fetch current primary driver and make PUT request to edit
   * @param primaryDriver
   * @returns {*}
   */
  function updatePrimaryDriver(primaryDriver) {
    //return Driver.update();
    return PrimaryDriver.update({quoteId: Quote.quoteId, primaryDriverId: primaryDriver._id}, primaryDriver);
  }

  /**
   * @name driversService.updateAdditionalDriver
   * @description calls AdditionalDriver resource to fetch current additional driver and make PUT request to edit
   * @param additionalDriver
   * @returns {*}
   */
  function updateAdditionalDriver(additionalDriver) {
    //return Driver.update();
    return AdditionalDriver.update({quoteId: Quote.quoteId, additionalDriverId: additionalDriver._id}, additionalDriver);
  }

}

export default DriversActions();
