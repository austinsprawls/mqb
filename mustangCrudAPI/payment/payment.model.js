'use strict';
/*Start imported npm modules*/
var mongoose = require('mongoose');
/*End imported npm modules*/

module.exports = paymentModel();

function paymentModel(){
    /*Start exported variables*/
    /*End exported variables*/

    /*Start local variables*/
    var Schema = mongoose.Schema;
    /*End local variables*/

    /*Start schema configuration*/
    var PaymentSchema = new Schema({
        _quoteID: { type: Schema.Types.ObjectId, ref: 'Quote' },
        total: Number,
        successfulOrderId: String,
        lastTransactionMsg: String,
        isComplete: Boolean,
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction'
        }]
    });
    /*End schema configuration*/

    /*Start schema instance methods*/
    /*End schema instance methods*/

    /*Start schema static methods*/
    /*End schema static methods*/

    /*Start private functions*/
    /*End private functions*/

    return mongoose.model('Payment', PaymentSchema);
}