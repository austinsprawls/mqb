'use strict';
/*Start imported npm modules*/
var mongoose = require('mongoose');
/*End imported npm modules*/

module.exports = vehicleModel();

function vehicleModel(){
  /*Start exported variables*/
  /*End exported variables*/

  /*Start local variables*/
  var Schema = mongoose.Schema;
  /*End local variables*/

  /*Start schema configuration*/
  var VehicleSchema = new Schema({
    //Start  EZInsure required fields
    vin: String,
    year: String,
    make: String,
    model:String,
    trim: String,
    subModel: String,
    partialVin: String,
    vehDrivenMiles: Boolean, //TODO have EZ Insure correct key
    vehTon: {type: Boolean, default: null}, // TODO over 3/4 tons should redirect to to call agent page if true returned by EZ Insure QQ ... B2 will auto-generate the true/false value based on vehicle make/model/submodel
    eqAmount: {type: Number, default: 0}, // Custom equipment in $$, defaults to 0
    chalWheelsAmt: {type: Number, default: 0},
    csBodyWkAmt: {type: Number, default: 0},
    csPaintAmt: {type: Number, default: 0},
    csTiresAmt: {type: Number, default: 0},
    csInteriorAmt: {type: Number, default: 0},
    handicapEqAmt: {type: Number, default: 0},
    stRoofAmt: {type: Number, default: 0},
    camShellAmt: {type: Number, default: 0},
    winchesAmt: {type: Number, default: 0},
    stereoEqAmt: {type: Number, default: 0},
    othAmt: {type: Number, default: 0},
    bisUse: {type:Boolean, default: false}, //Defaults to false for minute quote
    vehInspection: {type: Boolean, default: false},
    garageInfo: {
      street: String,
      street2: String,
      city: String,
      state: {type: String, default: "TX"},
      county: String,
      zip: String //TODO NOT NECESSARY?
    },
    requests : {
      compDeductible: {type: Number, default: 0},
      collDeductible: {type: Number, default: 0},
      rentReimbursement: {type: Number, default: 0},
      towingAndLabor: {type: Number, default: 0}
    },
    //End EZInsure required fields
    //Start clutch specific fields
    OTC: Number,
    collDeduct: Number,
    rentReimb: String,
    towAndLabor: String,
    inspection: String,
    ownershipType: String,
    securityType: String,
    lienholder: {
      fullName: String,
      street: String,
      city: String,
      state: String,
      zip: String,
      provider: String
    },
    _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote' }
    //End clutch specific fields
  });
  /*End schema configuration*/

  /*Start schema instance methods*/
  /*End schema instance methods*/

  /*Start schema static methods*/
  /*End schema static methods*/

  /*Start private functions*/
  /*End private functions*/

  return mongoose.model('Vehicle', VehicleSchema);
}
