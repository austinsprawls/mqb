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
    }
  };

}
