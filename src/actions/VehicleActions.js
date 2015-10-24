/**
 * Created by jlillz on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher'
import ActionTypes from '../constants/ActionTypes'
//import mustangCrud from '../../mustangCrudAPI/quote'

var VehicleActions = {
  createVehicle: function() {
    mustangCrud.vehicle.create().then(function(newVehicle) {
      Dispatcher.dispatch({
        actionType: ActionTypes.CREATE_VEHICLE,
        vehicle: newVehicle
      });
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
  getVehicleModels: function() {},
  getVehicleTrims: function() {},
  getVehicleGarageCounties: function() {}
};


export default VehicleActions;
