'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ViolationSchema = new Schema({
  code: {
    type: String,
    required: true
  },
  //point: {
  //  type: String,
  //  required
  //}
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
}).get(function(val){
    // Remove the _id from the Violations
    delete val._id;
    return val;
  });

var FullQuoteSchema = new Schema({
    // general request requirements
    productState: {
      type: String,
      required: true
    },
    agentId: {
      type: String,
      required: true
    },
    //dnrReason: {
    //  type: String,
    //  required: false
    //},
    requestType: {
      type: String,
      required: true
    },
    referenceNumber: {
      type: String,
      required: true
    },
    quoteNumber: {
      type: String,
      required: false
    },
    productQuoteID: {
      type: String,
      required: false
    },
    // FullQuote Specific requirements
    underwritings: {
      type: [],
      required: true
    },
    // general payload info
  // general payload info
  primaryDriver: {
    _id: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    middleName: {
      type: String,
      default: '',
      required: false
    },
    lastName: {
      type: String,
      required: true
    },
    suffix: {
      type: String,
      default: '',
      required: false
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    street: { //TODO: doesn't exist on primaryDriver model
      type: String,
      required: true
    },
    aptNumber: {
      type: String,
      required: true //TODO: doesn't exist on primaryDriver model
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true
    },
    employer: {
      type: String,
      required: true
    },
    mobilePhone: {
      type: String,
      required: true
    },
    homePhone: {
      type: String,
      required: true
    },
    workPhone: {
      type: String,
      required: true
    },
    county: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    isMale: {
      type: Boolean,
      required: true
    },
    isMarried: {
      type: Boolean,
      required: true
    },
    relationship: {
      type: String,
      required: true
    },
    licenseType: {
      type: String,
      required: true
    },
    licenseNum: {
      type: String,
      //required: true  // TODO: ???????????????????
    },
    stateLicense: {
      type: String,
      required: true
    },
    //yearLicensedInUS: {
    //  type: Number,
    //  //required: true
    //},
    yearsLicensed: {
      type: String,
      //required: true
    },
    sr22: {
      type: Boolean,
      required: true
    },
    coInsured: {
      type: {
        firstName: {
           type: String,
           required: true // TODO ????????????????
        },
        middleName: {
          type: String,
          required: true  // TODO ????????????????
        },
        lastName: {
          type: String,
          required: true  // TODO ????????????????
        },
        suffix: {
          type: String,
          required: true  // TODO ????????????????
        },
        isCoinsuredSpouse: {
          type: Boolean,
          required: true
        }
      },
      required: false
    },
    //atFaultViolations: {
    //  type: String,
    //  required: true
    //},
    //speedingTickets: {
    //  type: String,
    //  required: true
    //},
    //otherViolations: {
    //  type: String,
    //  required: true
    //},
    violationsArray: { // TODO: schema keys do not match expected ezInsure keys
      type: [
        ViolationSchema // TODO: schema keys do not match expected ezInsure keys
      ],
      required: false,
    }, // TODO: schema keys do not match expected ezInsure keys
    priorCarrier: {
      type: {
        priorCarrier: {
          type: String,
          required: true
        },
        priorPolicy: {
          type: String,
          required: true
        },
        priorPolicyExpDt: {
          type: String,
          required: true
        }
      },
      required: true
    },
    //eft: { // TODO this is one big remove me
    //  type: {
    //    accountType: {
    //      type: String,
    //      required: true
    //    },
    //    accountNumber: {
    //      type: String,
    //      required: true
    //    },
    //    routingNumber: {
    //      type: String,
    //      required: true
    //    }
    //  },
    //  required: false
    //},
    coverages: {
      bi: {
        type: String,
        required: true,
        default: null //TODO: null is an object Number is a 'number'
      },
      pd: {
        type: String,
        required: true,
        default: null //TODO: null is an object Number is a 'number'
      },
      umbi: {
        type: String,
        //required: true, // TODO ????????????????
        default: 0 //TODO: null is an object Number is a 'number'
      },
      umpd: {
        type: String,
        //required: true, // TODO ????????????????
        default: 0 //TODO: null is an object Number is a 'number'
      },
      pip: {
        type: String,
        //required: true,  // TODO ????????????????
        default: 0 //TODO: null is an object Number is a 'number'
      },
      med: {
        type: String,
        required: true,
        default: null //TODO: null is an object Number is a 'number'
      }
    },
    discounts: {
      hasPriorCoverage: {
        type: Boolean,
        required: true
      },
      priorCoverage: {
        type: String,
        required: false,
        default: "0"
      },
      homeowner: {
        type: Boolean,
        required: true,
        default: false
      },
      advancedQuote: {
        type: Boolean,
        required: true
      },
      eDelivery: {
        type: Boolean,
        required: true
      },
      fullDisclosure: {
        type: Boolean,
        required: true
      },
      inHouseAgencyRenewal: {
        type: Boolean,
        required: true
      },
      recurringCC: {
        type: Boolean,
        required: true
      },
      goodStudent: {
        type: String,
      },
      eftDiscount: {
        type: Boolean,
        required: true,
        default: true //TODO: Don't default this
      }
    },
    requests: {
      paymentPlan: {
        type: String,
        required: true
      },
      downPayment: {
        type: String,
        required: true
      },
      medicalPayment: {
        type: String,
        required: false
      },
      productCode: {
        type: String, //TODO: being concatenated together in pre flight transform
        required: true
      },
      term: {
        type: String,
        required: true
      },
      rqEffDt: {
        type: String,
        required: true
      }
    }
  },
  additionalDrivers: [
    {
      _id: {
        type: String,
        required: true
      },
      firstName: {
        type: String,
        required: true
      },
      middleName: {
        type: String,
        //required: true  // TODO: ???????????????????
      },
      lastName: {
        type: String,
        required: true
      },
      suffix: {
        type: String,
        //required: true  // TODO: ???????????????????
      },
      email: {
        type: String,
        required: true
      },
      phoneNumber: {
        type: String,
        required: true
      },
      dob: {
        type: String,
        required: true
      },
      isMale: {
        type: Boolean,
        required: true
      },
      isMarried: {
        type: Boolean,
        required: true
      },
      relationship: {
        type: String,
        required: true
      },
      licenseType: {
        type: String,
        required: true
      },
      licenseNum: {
        type: String,
        //required: true  // TODO: ???????????????????
      },
      stateLicense: {
        type: String,
        required: true
      },
      yearLicensedInUS: {
        type: Number,
        required: true
      },
      yearLicensed: {
        type: String,
        //required: true  // TODO: ???????????????????
      },
      sr22: {
        type: Boolean,
        required: true
      },
      //atFaultViolations: {
      //  type: String,
      //  required: true
      //},
      //speedingTickets: {
      //  type: String,
      //  required: true
      //},
      //otherViolations: {
      //  type: String,
      //  required: true
      //},
      violationsArray: { // TODO: schema keys do not match expected ezInsure keys
        type: [
          ViolationSchema // TODO: schema keys do not match expected ezInsure keys
        ],
        required: false,
      }, // TODO: schema keys do not match expected ezInsure keys
      discounts: {
        //hasPriorCoverage: Boolean, // TODO : currently defaulting in model no question on frontend
        //priorCoverage: {
        //  type: String,
        //  required: true
        //}, // TODO : currently defaulting in model no question on frontend

      }
    }
  ],
  vehicles: [
    {
      vin: {
        type: String,
        required: true
      },
      year: {
        type: String,
        required: true
      },
      make: {
        type: String,
        required: true
      },
      model: {
        type: String,
        required: true
      },
      subModel: {
        type: String,
        required: true
      },
      vehDrivenMiles: {
        type: Boolean,
        required: true
      },
      vehTon: {
        type: Boolean,
        required: true
      },
      eqAmount: {
        type: Number,
        //required: true,
        default: 0
      },
      chalWheelsAmt: {
        type: Number,
        default: 0
      },
      csBodyWkAmt: {
        type: Number,
        default: 0
      },
      csPaintAmt: {
        type: Number,
        default: 0
      },
      csTiresAmt: {
        type: Number,
        default: 0
      },
      csInteriorAmt: {
        type: Number,
        default: 0
      },
      handicapEqAmt: {
        type: Number,
        default: 0
      },
      stRoofAmt: {
        type: Number,
        default: 0
      },
      camShellAmt: {
        type: Number,
        default: 0
      },
      winchesAmt: {
        type: Number,
        default: 0
      },
      stereoEqAmt: {
        type: Number,
        default: 0
      },
      othAmt: {
        type: Number,
        default: 0
      },
      trim: {
        type: String,
        required: true
      },
      bisUse: {
        type: Boolean,
        required: true
      },
      vehInspection: {
        type: Boolean,
        required: true
      },
      //licensePlateNo: {
      //  type: String,
      //  required: false
      //},
      requests: {
        compDeductible: {
          type: Number,
          required: true
        },
        collDeductible: {
          type: Number,
          required: true
        },
        rentReimbursement: {
          type: Number,
          required: true
        },
        towingAndLabor: {
          type: Number,
          required: true
        }
      },
      garageInfo: {
        type:{
          street: {
            type: String,
            required: true
          },
          aptNumber: {
            type: String,
            required: true
          },
          city: {
            type: String,
            required: true
          },
          state: {
            type: String,
            required: true
          },
          county: {
            type: String,
            required: true
          },
          zip: {
            type: String,
            required: true
          }
        },
        required: true
      }
    }
  ]
});
module.exports = mongoose.model('fullQuotePayLoad', FullQuoteSchema);
