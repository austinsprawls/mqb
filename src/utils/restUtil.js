import request from 'superagent';
import $ from 'jquery';
//Import dispatcher
const API_URL = "/api/quotes/";
module.exports = restUtil();

function restUtil(){

  function get(url){
    //TODO figure out how to use request
    //return request.get(url);
    var options = {
      url: url,
      method: "POST",
      dataType:"json",
      success: success,
      error: error
    };
    return $.ajax(options);
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
      }
    }
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
