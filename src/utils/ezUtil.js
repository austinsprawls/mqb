/**
 * Created by jlillz on 10/25/15.
 */
import request from 'superagent';
const API_URL = "/ez/api/";

module.exports = ezUtil();

function ezUtil(){
  function buildURL(url){
    if(url) return API_URL + url;
    return API_URL;
  }

  function handleResponse(resolve, reject){
    return (err, response) => {
      if(err) reject(err);
      resolve(response.body);
    }
  }

  function callAPI(options){
    var promise = (resolve, reject) => {
      request(options.method, options.url)
        .set(options.headers)
        .send(options.json)
        .end(handleResponse(resolve,reject))
    };
    return new Promise(promise)
  }

  function getYears(){
    var url = buildURL("vehicles/v1/years"),
      options = {
        url: url,
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      };
    return callAPI(options)
  }

  function getMakesByYear(year){
    var url = buildURL("vehicles/v1/makes/" + year),
      options = {
        url: url,
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      };
    return callAPI(options)
  }

  function getModelsByYearMake(year, make){
    var url = buildURL("vehicles/v1/models/" + year + "/" + make),
      options = {
        url: url,
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      };
    return callAPI(options)
  }

  function getTrimsByYearMakeModel(year, make, model){
    var url = buildURL("vehicles/v1/years" + year + "/" + make + "/" + model),
      options = {
        url: url,
        method: "GET",
        headers: {
          "Accept": "application/json"
        }
      };
    return callAPI(options)
  }


  return {
    vehicle: {
      getYears: getYears,
      getMakesByYear: getMakesByYear,
      getModelsByYearMake: getModelsByYearMake,
      getTrimsByYearMakeModel:getTrimsByYearMakeModel
    }
  };

}
