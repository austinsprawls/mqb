'use strict';

var quoteCtrl = require('./quote.controller');

var VehicleModule = require('../vehicle/vehicle.index'),
    Vehicle = new VehicleModule(),
    vehicleCtrl = Vehicle.controller;

var quoteExport = {
  query: quoteCtrl.index,
  create: quoteCtrl.create,
  update: quoteCtrl.index,
  destroy: quoteCtrl.index
};


//Vehicles functions
var vehicleExport = {
  query: vehicleCtrl.index,
  create: vehicleCtrl.create,
  update: vehicleCtrl.update,
  delete: vehicleCtrl.delete
};


module.exports = {
  quote: quoteExport,
  vehicle: vehicleExport
};