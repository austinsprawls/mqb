/**
 * Created by jlillz on 10/22/15.
 */
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import restUtil from '../utils/restUtil';
import ezUtil from '../utils/ezUtil'

var InitializeActions = {
  initApp: function() {
      console.log("Creating quote.");

      restUtil.quote.create().then( function(data){
        console.log("Quote created: ", data);
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: data
        });
      }, function(err){
        console.log("Promise: ", err);
      });
  },
  getVehicleYears: function(){
    console.log('getting years');
    ezUtil.vehicle.getYears().then(function(years) {
      Dispatcher.dispatch({
        actionType: ActionTypes.GET_VEHICLE_YEARS,
        years: years
      })
    })
  }
};

export default InitializeActions;

