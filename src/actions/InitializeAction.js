/**
 * Created by jlillz on 10/22/15.
 */
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

//import crudApp
import mustangCrud from '../../mustangCrudAPI/quote';


var InitializeActions = {
  initApp: function() {
    //TODO get/create new quote
    function createQuote() {
      console.log("creating quote");
      mustangCrud.quote.createQuote().then((data)=>{
        mqb.state = data.state; //Attach state to global namespace TODO: find a better way to do this
        Dispatcher.dispatch({
          actionType: ActionTypes.INITIALIZE,
          initialData: data
        });
      });
    }
  }
};

export default InitializeActions;

