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
    const quoteID = cookieParser(document.cookie, /clutch-cookie=/);

    function cookieParser(cookies, regex){
      var cookies = cookies,
        regEx = regex,
        cookie = cookies.split('; ').filter( (cookie) => {
          return cookie.match(regEx);
        })[0];
      return cookie ? cookie.split('=')[1] : '';
    }

    if(quoteID){
      restUtil.quote.show(quoteID).then( function(quote){
        const vehicles = quote.vehicles;
        var vehicleInfoOptions = {};
        var vehicleInfoPromises = vehicles.map( vehicle => {
          return new Promise( (resolve, reject) => {
            var promiseArr = [];
            if (vehicle.trim) {
              promiseArr = [
                ezUtil.vehicle.getMakesByYear(vehicle.year),
                ezUtil.vehicle.getModelsByYearMake(vehicle.year, vehicle.make),
                ezUtil.vehicle.getTrimsByYearMakeModel(vehicle.year, vehicle.make, vehicle.model)
              ];
            }

            Promise.all(promiseArr).then(results => {
              vehicleInfoOptions[vehicle._id] = results.length ?
              {makes: results[0], models: results[1], trims: results[2]} : {makes: [], models: [], trims: []};
              resolve();
            });
          })
        });

        Promise.all(vehicleInfoPromises).then(result => {
          console.log("the result of resolvedVehicleInfoPromise: ", vehicleInfoOptions);
          Dispatcher.dispatch({
            actionType: ActionTypes.INITIALIZE,
            initialData: {
              quote: quote,
              vehicleInfoOptions: vehicleInfoOptions
            }
          });
        });


      }, function(err){
        console.log("Promise: ", err);
      });
    } else {
      restUtil.quote.create().then( function(quote){
        document.cookie = "clutch-cookie=" + quote._id;
        var vehicleInfoOptions = {};
        vehicleInfoOptions[quote.vehicles[0]._id] = {
          makes:[],
          models: [],
          trims: []
        };
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: {
            quote: quote,
            vehicleInfoOptions: vehicleInfoOptions
          }
        })
      })
    }

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

