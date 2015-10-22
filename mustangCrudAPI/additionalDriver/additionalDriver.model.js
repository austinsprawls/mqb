'use strict';
/*Start imported npm modules*/
var mongoose = require('mongoose');
/*End imported npm modules*/

module.exports = additionalDriverModel();

function additionalDriverModel(){
    /*Start exported variables*/
    /*End exported variables*/

    /*Start local variables*/
    var Schema = mongoose.Schema;
    /*End local variables*/

    /*Start schema configuration*/
    var AdditionalDriverSchema = new Schema({
        //Start  EZInsure required fields
        firstName: String,
        middleName: String,
        lastName: String,
        phoneNumber: String,
        suffix: {type: String, default: ''},
        dob: Date,
        isMale: Boolean,
        isMarried: Boolean,
        isStudent: Boolean,
        relationship: { type: String, enum: ['I', 'S', 'P', 'C', 'E', 'O'] },
        liabilityCov: Number, //only choice 30/60 should probably make this 2 things Ex High and Low
        stateLicense: { type: String, default: 'TX' },
        licenseType: {type: String, default: 'T'},
        licenseNum: String,
        yearsLicensed: { type: String, enum: ['0', '1', '2', '3'] },
        sr22: { type: Boolean, default: false },   //Asked on Add'l Info, $25 fee shown on payments
        occupation: String,
        employer: String,
        atFaultViolations: {type: String, default:0},
        speedingTickets: {type: String, default:0},
        otherViolations: {type: String, default:0},
        violationsArray: [],
        discounts: {
          hasPriorCoverage: {type: Boolean, default: false}, //TODO: is this required? the example request for QQ has it JM: 9-14-15
          priorCoverage: {type: String, default: "0"}, //TODO is it okay to default this to zero?  is this required? the example request for QQ has it JM: 9-14-15
          goodStudent: {type: String, default: null},
        },
        //End EZInsure required fields
        //Begin clutch specific fields
        //TODO remove front-end specific variables ( is2ndNamedInsured, isUSLicense, hasViolations )
        email: String,
        zipCode: String,
        county: String,
        employmentStatus: String,
        isExcluded: Boolean,
        totalViolationPoints: Number,
        is2ndNamedInsured: Boolean,
        isUSLicense: Boolean ,
        licenseStatus: String,
        hasViolations: Boolean,
        isMVRObtained: { type: Boolean, default: false },
        mvrViolations: [],
        phoneType: {type: String, default:'mobile'},
        propDamage: Number, //mandatory 25
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

    return mongoose.model('AdditionalDriver', AdditionalDriverSchema);
}
