'use strict';
/*Start imported npm modules*/
var _ = require('lodash');
var request = require('request');
var config = require('../../config/environment'); //TODO move
var messages = require('../../components/messages'); //TODO move
/*End imported npm modules*/

module.exports = chargeUtil();

function chargeUtil(){
    /*Start exported variables*/
    /*End exported variables*/

    //Exported object
    var exported = {
        charge: charge
    };

    /*Start local variables for chargeUtil*/
    // See https://pay1.plugnpay.com/admin/doc_replace.cgi?doc=Remote_Client_Integration_Specification.htm
    messages = {
        success: 'Transaction successfully placed.',
        duplicate: 'Order has already successfully been placed.',
        declined: 'The credit card was declined.',
        pnpProblem: 'Transaction failed: please call an agent.',
        pending: 'Transaction is currently pending.'
    };
    /*End local variables for chargeUtil*/

    /*Start exported functions*/
    function charge(chargeData) {
        var purchaseModel = chargeData.purchaseModel,
            purchaseID = chargeData.purchaseID,
            receiptKey = chargeData.receiptKey,
            receiptModel = chargeData.receiptModel,
            chargeInfo = chargeData.chargeInfo,
            res = chargeData.res;
        var purchase = {};
        var receipt = new receiptModel(),
            orderID = receipt._id.toString();

        //Static options for plug'n pay service
        var pnpInfo = {
            mode: 'auth',
            "publisher-name": config.plugnpay.username,
            "publisher-password": config.plugnpay.password,
            orderID: orderID
        };
        //Merge static code with charge information eg. CC# or Routing#
        var pnpFormPayload = _.merge(pnpInfo, chargeInfo);

        purchaseModel.findById(purchaseID)
            .populate(receiptKey)
            .exec(handlePurchaser);

        function handlePurchaser(err, result){
            if(err) handleError(res, err);
            purchase = result;

            //Prevent multiple charges
            if (purchase.successfulOrderId &&
                purchase.isComplete &&
                containsSuccessfulReceipt(purchase[receiptKey])) {
                return handleError(res, messages.duplicate);
            }

            // Post the purchase to Plug'nPay
            request.post(config.plugnpay.url, {form: formPayload}, handlePlugNPayTrans);
        }

        /**
         * @name handlePlugNPayTrans
         * @description handles information returned from EZInsure
         *  saves receipt and sets proper purchase fields based on plugnpay results
         * @param err
         * @param httpResponse
         * @param body
         * @returns 201 - Payment with all receipt results
         *          500 - Failure occured saving receipt or updating purchase
         */
        function handlePlugNPayTrans(err, httpResponse, body){
            if(err) return handleError(res, err);

            receipt = _.merge(receipt, uriParamsToJSON(body));

            receipt.save(function(err, receipt) {
                if(err) return handleError(res, err);

                //Payment fields set based on receipt results
                var isComplete = null;
                var successfulOrderId = null;
                var lastTransactionMsg = null;
                var total = null;

                //Sets proper values based on receipt status
                if(receipt.FinalStatus === 'success' && receipt.success === 'yes' && !receipt.Duplicate){
                    isComplete = true;
                    successfulOrderId = orderID;
                    lastTransactionMsg = messages.success;
                    total = receipt.amountcharged;
                } else {
                    isComplete = false;
                    if (receipt.FinalStatus === 'problem') lastTransactionMsg = messages.pnpProblem;
                    if (receipt.FinalStatus === 'pending') lastTransactionMsg = messages.pending;
                    if (receipt.Duplicate === 'yes') lastTransactionMsg = messages.duplicate;
                }

                //Payment update options for mongoose
                //TODO make this a save function
                var updates = {
                    $push: {},
                    isComplete: isComplete,
                    successfulOrderId: successfulOrderId,
                    lastTransactionMsg: lastTransactionMsg
                };
                updates[receiptKey] = receipt;

                Purchase.findByIdAndUpdate( purchaseID, updates)
                    .populate(receiptKey)
                    .exec(function(err, purchase){
                        if(err) handleError(res, err);
                        return res.json(201, purchase );
                    }
                )
            });

        }
    }
    /*End exported functions*/

    /*Start local functions*/
    /**
     * @name containsSuccessfulReceipt
     * @description searches transaction array for a success
     * @param receipts
     * @returns boolean
     */
    function containsSuccessfulReceipt(receipts){
        var successfulTransArr = receipts.filter(function(receipt){
            return receipt.FinalStatus === "success"
        });

        return successfulTransArr.length !== 0
    }

    /**
     * //TODO move to common.util with handleError at some point
     * @name uriParamsToJSON
     * @description converst uriParam string to JSON
     * @param string
     * @returns Object
     */
    function uriParamsToJSON(string){
        var decodedString = decodeURIComponent(string);
        var paramArr = decodedString.split('&').map(function(pair){return pair.split('=');});
        return _.zipObject(paramArr);
    }
    /*End local functions*/

    return exported;
}





