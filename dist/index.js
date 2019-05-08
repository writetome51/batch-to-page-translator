"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var in_range_1 = require("@writetome51/in-range");
var not_1 = require("@writetome51/not");
/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/
var BatchToPageTranslator = /** @class */ (function () {
    function BatchToPageTranslator(__pageInfo, __batchInfo) {
        this.__pageInfo = __pageInfo;
        this.__batchInfo = __batchInfo;
    }
    BatchToPageTranslator.prototype.set_currentBatchNumber_toBatchContainingPage = function (pageNumber) {
        this.__batchInfo.currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
    };
    BatchToPageTranslator.prototype.getBatchNumberContainingPage = function (pageNumber) {
        if (not_1.not(in_range_1.inRange([1, this.__pageInfo.totalPages], pageNumber))) {
            throw new Error('The requested page does not exist.');
        }
        return get_rounded_up_down_1.getRoundedUp(pageNumber / this.__batchInfo.pagesPerBatch);
    };
    BatchToPageTranslator.prototype.currentBatchContainsPage = function (pageNumber) {
        if (has_value_no_value_1.noValue(this.__batchInfo.currentBatchNumber))
            return false;
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        return (this.__batchInfo.currentBatchNumber === batchNumber);
    };
    // Takes `pageNumber` and translates it into a page of the current batch.
    // Example: say pagesPerBatch is 10, the currentBatchNumber is 2, and passed
    // `pageNumber` is 11. That would be page 1 of the current batch, so the function returns 1.
    BatchToPageTranslator.prototype.getPageNumberInCurrentBatchFromAbsolutePage = function (pageNumber) {
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        if (this.__batchInfo.currentBatchNumber !== batchNumber) {
            throw new Error("The property \"currentBatchNumber\" is not set to the batch number \n\t\t\tthat contains the passed pageNumber. \n\t\t\tCall this.set_currentBatchNumber_toBatchContainingPage(pageNumber) before calling \n\t\t\tthis function.");
        }
        return (pageNumber
            - ((this.__batchInfo.currentBatchNumber - 1) * this.__batchInfo.pagesPerBatch));
    };
    return BatchToPageTranslator;
}());
exports.BatchToPageTranslator = BatchToPageTranslator;
