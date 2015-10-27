import request from 'superagent';
const API_URL = "/api/quotes/";
module.exports = restUtil();

function restUtil(){

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

  function show(url){
    var options = {
      url: url,
      method: "GET",
      headers:{
        "Accept": "application/json"
      }
    };
    return callAPI(options);
  }

  function create(url, payload){
    var options = {
      url: url,
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      json: payload
    };
    return callAPI(options);
  }

  function update(url, payload){
    var options = {
      url: url,
      method: "PUT",
      headers:{
        "Accept": "application/json"
      },
      json: payload
    };
    return callAPI(options);
  }

  function destroy(url){
    var options = {
      url: url,
      method: "DELETE",
      headers:{
        "Accept": "application/json"
      }
    };
    return callAPI(options);
  }

  return {
    quote: {
      create: (quote) => {
        var url = buildURL('');
        return create(url, quote);
      },
      show: (id) => {
        var url = buildURL(id);
        return show(url)
      }
    },
    vehicle: {
      create: (vehicle) => {
        var url = buildURL( vehicle._quoteID + '/vehicles/');
        return create(url, vehicle)
      },
      update: (vehicle) => {
        var url = buildURL( vehicle._quoteID + '/vehicles/' + vehicle._id);
        return update(url, vehicle)
      },
      destroy: (vehicle) => {
        var url = buildURL( vehicle._quoteID + '/vehicles/' + vehicle._id);
        return destroy(url)
      }
    },
    drivers: {
      show: (quoteId) => {
        var url = buildUrl(quoteId + '/drivers/')
        var result = show(url)
        return 
      }
    },
    primaryDriver: {
      //index remove update
      show: (quoteId) => {
        var url = buildUrl(quoteId + '/drivers/primary/')
        return show(url)
      },
      update: (driver) => {
        var url = buildURL( driver._quoteID + '/drivers/primary/');
        return update(url, driver)
      },
      // destroy: (driver) => {
      //   var url = buildURL( driver._quoteID + '/drivers/primary/' + driver._id);
      //   return destroy(url)
      // },
    },
    additionalDrivers: {
      //create index remove update
      create: (quoteId) => {
        var url = buildURL( quoteId + '/drivers/additional/');
        return create(url)
      },
      show: (driverId) => {
        var url = buildUrl(drivers._quoteID + '/drivers/additional/' + driver._id)
        return show(url)
      },
      update: (driver) => {
        var url = buildURL( driver._quoteID + '/drivers/additional/' + driver._id);
        return update(url, driver)
      },
      destroy: (driver) => {
        var url = buildURL( driver._quoteID + '/drivers/additional/' + driver._id);
        return destroy(url)
      },
    },
  };
}
