/**
 * Created by jlillz on 10/22/15.
 */
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import restUtil from '../utils/restUtil.js';

var InitializeActions = {
  initApp: function() {
    //TODO get/create new quote
      console.log("Creating quote");
      //ajax call for create
      restUtil.quote.create().then((data)=>{
        console.log("Quote created: ", data);
        mqb.state = data.state; //Attach state to global namespace TODO: find a better way to do this
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: data
        });
      });
  }
};

export default InitializeActions;

