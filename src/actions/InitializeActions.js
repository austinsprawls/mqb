/**
 * Created by jlillz on 10/22/15.
 */
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import restUtil from '../utils/restUtil.js';
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
  getVehicleYears: function() {
    console.log("Getting vehicle years");
    Dispatcher.dispatch({
      actionType: ActionTypes.GET_VEHICLE_YEARS,
      years: ['2016', '2015', '2014', '2013']
    });
  }
};

export default InitializeActions;

