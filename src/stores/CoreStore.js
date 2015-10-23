/**
 * Created by austinsprawls on 10/22/15.
 */
"use strict";

import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';


// TODO update this on quote initialization
var _state= 'TX';


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

  getState: function() {
    return _state;
  }

});

Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _state = action.initialData.state;
      CoreStore.emitChange();
      break;
    default:
    // no op

  }
});

export default CoreStore;
