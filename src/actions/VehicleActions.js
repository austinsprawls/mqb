/**
 * Created by jlillz on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher'
import ActionTypes from '../constants/ActionTypes'
import restUtil from '../utils/restUtil.js'
import ezUtil from '../utils/ezUtil.js'

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
    restUtil.vehicle.update(updatedVehicle).then(function(updatedVehicle) {
      console.log("updated the vehicle from restUtil:", updatedVehicle);
      Dispatcher.dispatch({
        actionType: ActionTypes.UPDATE_VEHICLE,
        vehicle: updatedVehicle
      });
    });
  },
  deleteVehicle: function(deletedVehicle) {
    restUtil.vehicle.delete(deletedVehicle).then(function(deletedVehicle) {
      Dispatcher.dispatch({
        actionType: ActionTypes.DELETE_VEHICLE,
        _id: deletedVehicle._id
      });
    });
  },
  getVehicleMakes: function(year) {
    ezUtil.vehicle.getMakesByYear(year).then(function(makes){
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_VEHICLE_MAKES,
        makes: makes
      });
    });
  },
  getVehicleModels: function(year, make) {
    ezUtil.vehicle.getModelsByYearMake(year, make).then(function(models) {
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_VEHICLE_MODELS,
        models: models
      })
    })
  },
  getVehicleTrims: function(year, make, model) {
    ezUtil.vehicle.getTrimsByYearMakeModel(year, make, model).then(function(trims) {
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_VEHICLE_TRIMS,
        trims: trims
      })
    })
  },
  getVehicleGarageCounties: function() {}
};

export default VehicleActions;
