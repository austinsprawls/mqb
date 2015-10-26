/**
 * Created by jlillz on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash'
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _vehicles = [],
    _vehicleYears = [],
    _vehicleInfoOptions = {};


var VehicleStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getAllVehicles: function() {
    return _vehicles;
  },

  getVehicleYears: function() {
    return _vehicleYears;
  },

  getAllVehicleInfoOptions: function() {
    return _vehicleInfoOptions;
  }

});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _vehicles = action.initialData.quote.vehicles;
      _vehicleInfoOptions = action.initialData.vehicleInfoOptions;
      VehicleStore.emitChange();
      break;
    case ActionTypes.GET_VEHICLE_YEARS:
      _vehicleYears = action.years;
      VehicleStore.emitChange();
      break;
    case ActionTypes.GET_VEHICLE_MAKES:
      _vehicleInfoOptions[action.data.vehicleID].makes = action.data.makes;
      VehicleStore.emitChange();
      break;
    case ActionTypes.GET_VEHICLE_MODELS:
      _vehicleInfoOptions[action.data.vehicleID].models = action.data.models;
      VehicleStore.emitChange();
      break;
    case ActionTypes.GET_VEHICLE_TRIMS:
      _vehicleInfoOptions[action.data.vehicleID].trims = action.data.trims;
      VehicleStore.emitChange();
      break;
    case ActionTypes.CREATE_VEHICLE:
      console.log("CREATE_VEHICLE action triggered, pushing new vehicle to store: ", action.vehicle);
      _vehicles.push(action.vehicle);
      VehicleStore.emitChange();
      break;
    case ActionTypes.UPDATE_VEHICLE:
      var existingVehicle = _.find(_vehicles, {_id: action.vehicle._id});
      var existingVehicleIndex = _.indexOf(_vehicles, existingVehicle);
      _vehicles.splice(existingVehicleIndex, 1, action.vehicle);
      VehicleStore.emitChange();
      break;
    case ActionTypes.DELETE_VEHICLE:
      _.remove(_vehicles, function(vehicle) {
        return action._id === vehicle._id;
      });
      VehicleStore.emitChange();
      break;
    default:
    // no op

  }
});

export default VehicleStore;
