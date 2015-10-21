'use strict';
/*Start imported npm modules*/
var mongoose = require('mongoose');
/*End imported npm modules*/

var ViolationSchema = new mongoose.Schema()
  ViolationSchema.add({
    code: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    service: {
      type: String,
      default: null
    },
  });
  ViolationSchema.get(function(val){
    // Remove the _id from the Violations
    delete val._id;
    return val;
  });
module.exports = primaryDriverModel();
function primaryDriverModel(){
    /*Start exported variables*/
    /*End exported variables*/

    /*Start local variables*/
    var Schema = mongoose.Schema;
    /*End local variables*/

    /*Start schema configuration*/
    var PrimaryDriverSchema = new Schema({
        //Start  EZInsure required fields
        firstName: String,
        middleName: String,
        lastName: String,
        suffix: String,
        email: String,
        phoneNumber: String,
        zip: String,
        address: String, //TODO get EZInsure to change from street
        unit: String, //TODO get EZInsure to change from aptNumber
        city: String,
        state: String,
        county: String,
        dob: Date,
        isMale: Boolean,
        isMarried: Boolean,
        isStudent: Boolean,
        relationship: { type: String, default: "I"},
        licenseType: {type: String, default: 'T'},
        stateLicense: {type: String, default: 'TX'},
        countryLicense: {type: String, default: 'US'},
        licenseNum: String,
        yearsLicensed: String,
        sr22: { type: Boolean, default: false },   //Asked on Add'l Info, $25 fee shown on Payments
        occupation: String,
        employer: String,
        atFaultViolations: {type: Number, default: 0},
        speedingTickets: {type: Number, default: 0},
        otherViolations: {type: Number, default: 0},
        coverages: {
            bi: { type: String, default: "30000/60000"},
            pd: { type: String, default: "25000"},
            umbi: { type: String, default: "0"},
            umpd: { type: String, default: "0"},
            pip: { type: String, default: "0"},
            med: { type: String, default: "0"}
        },
        coInsured: {
            firstName: String,
            middleName: String,
            lastName: String,
            suffix: String,
            isCoinsuredSpouse: Boolean
        },
        otherViolationsArray: [ViolationSchema], //TODO: remove this key as well as update b2
        violationsArray: [ViolationSchema],
        discounts: {
            hasPriorCoverage: Boolean,
            priorCoverage: String, //TODO is it okay to default this to zero?
            homeOwner: Boolean,
            advancedQuote: {type: Boolean, default: false}, // TODO set to boolean based on reqEffDate front end helper
            eDelivery: { type: Boolean, default: true},
            priorCarrier: String,
            fullDisclosure: { type: Boolean, default: true},
            inHouseAgencyRenewal:  { type: Boolean, default: false},
            recurringCC: { type: Boolean, default: false},
            eftDiscount: {type: Boolean, default: true}, // default to true until user chooses which requests.paymentPlan
            //TODO Not in data dictionary??
            priorCarrierExpiration: {type: Date, default: Date.now()},
            priorCoverageMonths: String,
            goodStudent: {type: String, default: null},
        },
        requests: {
            paymentPlan: { type: String, default: "eft" },
            downPayment: {type: Number, default: 16.67},
            selectedProductName: {type: String, default: null},
            selectedProgramName: {type: String, default: 'STD'},
            selectedProgramTerm: {type: String, default: "six_month"},
            medicalPayment: { type: Number, default: 0}, //TODO why is this here twice? //TODO remove this
            reqEffDate: { type:Date, default: Date.now} //requested date (pre time and date adjustment when paying) //TODO set in quote schema instead
        },
        //TODO see whats up with "eft" tag in data dictionary
        //End  EZInsure required fields
        //Begin clutch specific fields
        propDamage: Number, //mandatory 25 //TODO access through coverages
        medPay: Number, //default $500 //TODO access through coverages
        employmentStatus: String, //TODO is this necessary?
        liabilityCov: Number, //only choice 30/60 should probably make this 2 things Ex High and Low //TODO find where this should map
        isUSLicense: Boolean ,
        totalViolationPoints: Number,
        is2ndNamedInsured: Boolean,
        licenseStatus: String, //TOOO we don't cat about the license status? why ask?
        isMVRObtained: { type: Boolean, default: false },
        mvrViolations: [],
        phoneType: {type: String, default:'mobile'},
        hasViolations: Boolean,
        _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote' },
        //end clutch specific fields
    });
    /*End schema configuration*/

    /*Start schema instance methods*/
    /*End schema instance methods*/

    /*Start schema static methods*/
    /*End schema static methods*/

    /*Start private functions*/
    /*End private functions*/

    return mongoose.model('PrimaryDriver', PrimaryDriverSchema);
}

