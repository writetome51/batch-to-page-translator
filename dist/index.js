"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var base_class_1 = require("@writetome51/base-class");
var errorIfNotInteger_1 = require("basic-data-handling/errorIfNotInteger");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var in_range_1 = require("@writetome51/in-range");
var not_1 = require("@writetome51/not");
/********************
 This class is intended to help a separate Paginator class paginate data that can only be saved
 in-memory one batch at-a-time, where each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 A single batch is measured by the number of pages it has.
 A batch is also defined as the total data the Paginator can handle all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in, tell the data-fetching tool what batch
 to fetch, and tell the Paginator what page to show.
 *******************/
var Batchinator = /** @class */ (function (_super) {
    __extends(Batchinator, _super);
    function Batchinator() {
        var _this = _super.call(this) || this;
        // The first 3 properties must be set before doing anything else:
        // totalDataCount; 
        // pagesPerBatch = 20;
        // itemsPerPage;  (the value should be gotten from the Paginator class)
        // currentBatchNumber  (read-only);
        // totalBatches  (read-only);
        // totalPages  (read-only);
        // itemsPerBatch  (read-only);
        _this.__pagesPerBatch = 20;
        _this.__currentBatchNumber = 1;
        _this._createGetterAndOrSetterForEach(['totalDataCount', 'pagesPerBatch', 'itemsPerPage'], {
            get_getterFunction: function (property) {
                return function () {
                    if (_this["__" + property] === null || _this["__" + property] === undefined) {
                        throw new Error("The property \"" + property + "\" must be given a value first.");
                    }
                    return _this["__" + property];
                };
            },
            get_setterFunction: function (property) {
                return function (value) {
                    errorIfNotInteger_1.errorIfNotInteger(value);
                    if (value < 1)
                        throw new Error("The property \"" + property + "\" must be at least 1.");
                    _this["__" + property] = value;
                };
            }
        });
        return _this;
    }
    Object.defineProperty(Batchinator.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "totalBatches", {
        get: function () {
            // @ts-ignore
            return get_rounded_up_down_1.getRoundedUp(this.totalPages / this.pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "totalPages", {
        get: function () {
            // @ts-ignore
            return get_rounded_up_down_1.getRoundedUp(this.totalDataCount / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "itemsPerBatch", {
        get: function () {
            // @ts-ignore
            return this.itemsPerPage * this.pagesPerBatch;
        },
        enumerable: true,
        configurable: true
    });
    Batchinator.prototype.set_currentBatchNumber_basedOnPage = function (pageNumber) {
        this.__currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
    };
    Batchinator.prototype.currentBatchContainsPage = function (pageNumber) {
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        return (this.currentBatchNumber === batchNumber);
    };
    Batchinator.prototype.getBatchNumberContainingPage = function (pageNumber) {
        if (not_1.not(in_range_1.inRange([1, this.totalPages], pageNumber))) {
            throw new Error('The requested page does not exist.');
        }
        // @ts-ignore
        return get_rounded_up_down_1.getRoundedUp(pageNumber / this.pagesPerBatch);
    };
    // Because the Paginator is not designed for handling batches (we assume), we have to translate
    // the passed pageNumber into a different number, returned by this function, which is the page
    // number the Paginator needs to show.
    Batchinator.prototype.getCurrentPageNumberForPaginator = function (pageNumber) {
        var batchNumber = this.getBatchNumberContainingPage(pageNumber);
        if (this.currentBatchNumber !== batchNumber) {
            throw new Error("The property \"currentBatchNumber\" is not set to the batch number \n\t\t\tthat contains the passed pageNumber. Call this.set_currentBatchNumber_basedOnPage(pageNumber)\n\t\t\tbefore calling this function.");
        }
        // @ts-ignore
        return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
    };
    return Batchinator;
}(base_class_1.BaseClass));
exports.Batchinator = Batchinator;
