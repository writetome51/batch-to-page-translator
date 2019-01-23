"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
// This class is for paginating data batches that can only be saved in-memory one-at-a-time, taken from a
// much bigger data set that can't be completely fetched all at once.  A single batch is measured by the
// number of pages it has.
// If the user is clicking thru pagination controls and clicks to page 10, for instance, it's this
// class' job to figure out which batch page 10 is in, get that batch saved in-memory, and make sure that
// this.__paginator.currentPage contains the correct items.
var BatchPaginator = /** @class */ (function () {
    function BatchPaginator(__paginator) {
        this.__paginator = __paginator;
        this.pagesPerBatch = 20;
    }
    Object.defineProperty(BatchPaginator.prototype, "totalBatches", {
        get: function () {
            var totalPages = get_rounded_up_down_1.getRoundedUp(this.totalItems / this.__paginator.itemsPerPage);
            return get_rounded_up_down_1.getRoundedUp(totalPages / this.pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchPaginator.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        // Giving this a value automatically updates this.__paginator.data .
        set: function (value) {
            this.__currentBatchNumber = value;
            this.__paginator.data = this.__getNewBatch(value);
        },
        enumerable: true,
        configurable: true
    });
    BatchPaginator.prototype.__getNewBatch = function (batchNumber) {
        // put code here that fetches the batch from another service,
        // and returns it.
    };
    BatchPaginator.prototype.__getBatchNumberContainingPageNumber = function (num) {
    };
    return BatchPaginator;
}());
exports.BatchPaginator = BatchPaginator;
