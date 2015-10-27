/**
 * Created by austinsprawls on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

var _state = '';
var _quoteId = '';

var CoreStore = Object.assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getDistrict: function() {
    return _state;
  },

  getQuoteId: function(){
    return _quoteId;
  }

});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _state = action.initialData.quote.productState;
      _quoteId = action.initialData.quote._id;
      CoreStore.emitChange();
      break;
    default:
    // no op

  }
});

export default CoreStore;
