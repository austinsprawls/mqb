/**
 * Created by jlillz on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher'
import ActionTypes from '../constants/ActionTypes'
//import mustangCrud from '../../mustangCrudAPI/quote'
import restUtil from '../utils/restUtil.js';

var VehicleActions = {
  createVehicle: function(vehicle) {
    restUtil.vehicle.create(vehicle).then(function(newVehicle) {
      console.log("created a new vehicle from restUtil:", newVehicle);
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_VEHICLE,
        vehicle: newVehicle
      });
    }, (err) => {
      console.log("Error: ", err);
    });
  },
  updateVehicle: function(updatedVehicle) {
    mustangCrud.vehicle.update().then(function(updatedVehicle) {
      Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_VEHICLE,
        vehicle: updatedVehicle

      });
    });
  },
  deleteVehicle: function(id) {
    mustangCrud.vehicle.delete().then(function(deletedVehicle) {
      Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_VEHICLE,
        _id: deletedVehicle._id
      });
    });
  },
  getVehicleMakes: function(year) {
    var vehicleMakes = {
      '2016': ['Mercedes-Benz'],
      '2015': ['Hyundai'],
      '2014': ['Acura'],
      '2013': ['Ford']
    };
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_VEHICLE_MAKES,
      makes: vehicleMakes[year]
    });
  },
  getVehicleModels: function(make) {
    var vehicleModels = {
      'Mercedes-Benz': ['CLA-250'],
      'Hyundai': ['Sonata'],
      'Acura': ['TL'],
      'Ford': ['Expedition']
    };
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_VEHICLE_MODELS,
      models: vehicleModels[make]
    });
  },
  getVehicleTrims: function(model) {
    var vehicleModels = {
      'CLA-250': ['2WD'],
      'Sonata': ['4WD'],
      'TL': ['6WD'],
      'Expedition': ['8WD']
    };
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_VEHICLE_TRIMS,
      trims: vehicleModels[model]
    });
  },
  getVehicleGarageCounties: function() {}
};


export default VehicleActions;
