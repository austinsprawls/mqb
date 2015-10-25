import request from 'superagent';
import $ from 'jquery';
//Import dispatcher
const API_URL = "/api/quotes/";
module.exports = restUtil();

function restUtil(){
  function callAPI(options){
    var cases = {

    }
    if(options.json){

    } else {

    }

  }


  function show(url){
    var options = {
      url: url,
      method: "GET",
      headers:{
        "Accept": "application/json"
      }
    };
    return new Promise((resolve, reject) => {
      request(options.method, options.url)
        .set(options.headers)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response)
        });
    });
  }

  function create(url, payload){
    var options = {
      url: url,
      method: "POST",
      headers:{
        "Accept": "application/json"
      },
      json: payload
    };

    return new Promise((resolve, reject) => {
      request(options.method, options.url)
        .send(options.json)
        .set(options.headers)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response.body)
        });
    });
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

    return new Promise((resolve, reject) => {
      request
        .post(options.url)
        .send(options.json)
        .set(options.headers)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response)
        });

      //request(options.method, options.url)
      //  .send(options.json)
      //  .set(options.headers)
      //  .end((err, response) => {
      //    if (err) reject(err);
      //    resolve(response)
      //  });
    });
  }

  function destroy(url){
    var options = {
      url: url,
      method: "DELETE",
      headers:{
        "Accept": "application/json"
      }
    };

    return new Promise((resolve, reject) => {
      request(options.method, options.url)
        .set(options.headers)
        .end((err, response) => {
          if (err) reject(err);
          resolve(response)
        });
    });
  }

  function buildURL(url){
    if(url) return API_URL + url;
    return API_URL;
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
