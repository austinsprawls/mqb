import request from 'superagent';
import $ from 'jquery';
//Import dispatcher
const API_URL = "/api/quotes/";
module.exports = restUtil();

function restUtil(){
  function handleError(err){
    console.log('ERROR:', err)
  }

  function get(url){
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

  function buildURL(url){
    if(url) return API_URL + url;
    return API_URL;
  }

  return {
    quote: {
      create: () => {
        return new Promise(  (success, error) => {
            var url = buildURL(),
              options = {
              url: url,
              method: "POST",
              dataType:"json",
              success: success,
              error: error
            };

            return $.ajax(options);
            //return get(url)
          }
        )
      },
      get: (url) => {
        return get(buildURL(url))

      }
    },
  };

}

{
  quote: {
    create: () => {
      return new Promise(  (success, error) => {
          var options = {
            url: "/api/quotes/",
            method: "POST",
            dataType:"json",
            success: success,
            error: error
          };
          $.ajax(options);
        }
      )
    }
  }
};
