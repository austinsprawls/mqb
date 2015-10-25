/**
 * Created by jmunsch on 10/24/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _primaryDriver = {};
var _additionalDrivers = [];

var DriversStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllDrivers: function() {
    return {primaryDriver: _primaryDriver, additionalDrivers: _additionalDrivers};
  },
});

Dispatcher.register(function(action) {
  console.log('DriverStore: action', action)
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _primaryDriver = action.initialData.primaryDriver;
      _additionalDrivers = action.initialData.additionalDrivers;
      DriversStore.emitChange();
      break;
    case ActionTypes.GET_DRIVERS:
      _primaryDriver = action.primaryDriver;
      _additionalDrivers = action.additionalDrivers;
      DriversStore.emitChange();
      break;
    case ActionTypes.CREATE_ADDITIONAL_DRIVER:
      _additionalDrivers.push(action.additionalDriver);
      DriversStore.emitChange();
      break;
    case ActionTypes.UPDATE_ADDITIONAL_DRIVER:
      var existingDriver = _.find(_additionalDrivers, {_id: action.additionalDriver._id});
      var existingDriversIndex = _.indexOf(_additionalDrivers, existingDriver);
      _additionalDrivers.splice(existingDriversIndex, 1, action.additionalDriver);
      DriversStore.emitChange();
      break;
    case ActionTypes.DELETE_ADDITIONAL_DRIVER:
      _.remove(_additionalDrivers, function(driver) {
        return action._id === driver._id;
      });
      DriversStore.emitChange();
      break;
    default:
    // no op

  }
});

export default DriversStore;
