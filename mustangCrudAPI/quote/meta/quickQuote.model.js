'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
var ViolationSchema = new Schema({
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
}).get(function(val){
    // Remove the _id from the OtherViolations
    delete val._id;
    return val;
  });


var QuickQuoteSchema = new Schema({
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
    //middleName: {
    //  type: String,
    //  default: '',
    //  required: false
    //},
    lastName: {
      type: String,
      required: true
    },
    //suffix: {
    //  type: String,
    //  default: '',
    //  required: false
    //},
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
    //licenseNum: {
    //  type: String,
    //  //required: true  // TODO: ???????????????????
    //},
    stateLicense: {
      type: String,
      required: true
    },
    //yearLicensedInUS: {
    //  type: Number,
    //  //required: true
    //},
    //yearLicensed: {
    //  type: String,
    //  //required: true
    //},
    yearsLicensed: {
      type: Number,
      //required: true
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
    violationsArray: {
      type: [
        ViolationSchema
      ],
      required: false,
    }, // TODO: schema keys do not match expected ezInsure keys
    coverages: {
      bi: {
        type: String,
        required: true
      },
      pd: {
        type: String,
        required: true
      },
      umbi: {
        type: String,
        required: true
      },
      umpd: {
        type: String,
        required: true
      },
      pip: {
        type: String,
        required: true
      },
      med: {
        type: String,
        required: true
      }
    },
    discounts: {
      hasPriorCoverage: {
        type: Boolean,
        required: true
      },
      priorCoverage: {
        type: String,
        required: true,
        default: "0"
      },
      eftDiscount: {
        type: Boolean,
        required: true,
        default: false //TODO set from front end and remove default
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
      //middleName: {
      //  type: String,
      //  //required: true  // TODO: ???????????????????
      //},
      lastName: {
        type: String,
        required: true
      },
      driverStatus: {
        type: String,
        required: true
      },
      //suffix: {
      //  type: String,
      //  //required: true  // TODO: ???????????????????
      //},
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
      //licenseNum: {
      //  type: String,
      //  //required: true  // TODO: ???????????????????
      //},
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
      violationsArray: {
        type: [
          ViolationSchema
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
        type: String,
        //required: true,
        default: null
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
      }
    }
  ]
});

module.exports = mongoose.model('quickQuotePayLoad', QuickQuoteSchema);
