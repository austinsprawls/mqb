/**
 * Created by jmunsch on 10/24/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher'
import ActionTypes from '../constants/ActionTypes'
import restUtil from '../utils/restUtil.js'
// import ezUtil from '../utils/ezUtil.js'

var DriversActions = {
    // all drivers
    getAllDrivers: function(quoteId){
      restUtil.drivers
      .show(quoteId)
      .then(function(drivers) {
        Dispatcher.dispatch({
            actionType: ActionTypes.GET_ALL_DRIVERS,
            primaryDriver: drivers.primaryDriver,
            additionalDrivers: drivers.additionalDrivers
          })
      })
    },
    // primary driver
    getPrimaryDriver: function(quoteId){
      restUtil.primaryDriver
        .show(quoteId)
        .then(function(driver){
          Dispatcher.dispatch({
            actionType: ActionTypes.GET_PRIMARY_DRIVER,
            primaryDriver: driver
          });
        })
    },
    updatePrimaryDriver: function(driver){
      restUtil.primaryDriver
        .update(driver)
        .then(function(updatedDriver){
          Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_PRIMARY_DRIVER,
            primaryDriver: updatedDriver
          });
        })
    },
    // additional drivers
    createAdditionalDriver: function(quoteId){
      restUtil.additionalDrivers.create(quoteId)
        .then(function(driver) {
          Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_ADDITIONAL_DRIVER,
            additionalDriver: driver
          });
        });
    },
    getAdditionalDriver: function(driverId){
      restUtil.additionalDrivers.show(driverId)
        .then(function(driver) {
          Dispatcher.dispatch({
            actionType: ActionTypes.GET_ADDITIONAL_DRIVER,
            additionalDriver: driver
          });
        });
    },
    updateAdditionalDriver: function(driver){
      restUtil.additionalDrivers.update(driver)
        .then(function(updatedDriver){
          Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_ADDITIONAL_DRIVER,
            additionalDriver: updatedDriver
          })
        })
    },
    removeAdditionalDriver: function(driver){
      restUtil.additionalDrivers.remove(driver)
        .then(function(driver_id){
          Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_ADDITIONAL_DRIVER,
            _id: driver_id
          })
        })
    },
}

export default DriversActions;

