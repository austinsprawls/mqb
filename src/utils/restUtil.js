import $ from 'jquery';

module.exports = {
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
