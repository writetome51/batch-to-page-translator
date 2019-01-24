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
 This class is for paginating data batches that can only be saved in-memory one batch
 at-a-time, where each batch is taken from a much bigger data set that can't be
 completely fetched all at once.
 A single batch is measured by the number of pages it has.

 An example: if the user is clicking thru pagination controls and clicks to page 10,
 it's this class' job to figure out which batch page 10 is in and tell this.__paginator
 what page to currently be showing.

 It's not this class' responsibility to actually fetch the data from a db or file,
 or assign the current batch to this.__paginator.data.  It does not handle the data.
 Because of this, the same paginator instance in this.__paginator must also be manipulated elsewhere.
 *******************/
var Batchinator = /** @class */ (function (_super) {
    __extends(Batchinator, _super);
    function Batchinator(__paginator) {
        var _this = _super.call(this) || this;
        _this.__paginator = __paginator;
        // totalBatches : number (read-only)
        // totalPages: number (read-only)
        // currentBatchNumber: number;
        // currentPageNumber: number;
        // totalDataCount: number;
        // pagesPerBatch = 20;
        _this.__pagesPerBatch = 20;
        _this._createGetterAndOrSetterForEach(['totalDataCount', 'pagesPerBatch'], {
            get_getterFunction: function (property) {
                return function () { return _this["__" + property]; };
            },
            get_setterFunction: function (property) {
                return function (value) {
                    errorIfNotInteger_1.errorIfNotInteger(value);
                    if (value < 1)
                        throw new Error("The property \"" + property + "\" must be at least 1");
                    _this["__" + property] = value;
                };
            }
        });
        return _this;
    }
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
            return get_rounded_up_down_1.getRoundedUp(this.totalDataCount / this.__paginator.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "currentPageNumber", {
        get: function () {
            return this.__currentPageNumber;
        },
        // Automatically updates this.currentBatchNumber to the batch that contains that page.
        // Also updates this.__paginator.currentPageNumber.
        set: function (pageNumber) {
            this.currentBatchNumber = this.__getBatchNumberContainingPageNumber(pageNumber);
            this.__currentPageNumber = pageNumber;
            this.__paginator.currentPageNumber = this.__getTranslatedPageNumberForPaginator(pageNumber);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        set: function (value) {
            errorIfNotInteger_1.errorIfNotInteger(value);
            if (not_1.not(in_range_1.inRange([1, this.totalBatches], value))) {
                throw new Error("You attempted to set the property \"currentBatchNumber\" to a value outside \n\t\t\t\tthe available range. It can be anything from 1 to the value of the \"totalBatches\" property.");
            }
            this.__currentBatchNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Batchinator.prototype.__getBatchNumberContainingPageNumber = function (pageNumber) {
        if (not_1.not(in_range_1.inRange([1, this.totalPages], pageNumber))) {
            throw new Error('The requested page does not exist.');
        }
        // @ts-ignore
        return get_rounded_up_down_1.getRoundedUp(pageNumber / this.pagesPerBatch);
    };
    // Because this.__paginator is not designed for handling batches, we have to translate
    // the requested pageNumber into a different number, which is then assigned to
    // this.paginator.currentPageNumber .
    Batchinator.prototype.__getTranslatedPageNumberForPaginator = function (pageNumber) {
        // @ts-ignore
        return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
    };
    return Batchinator;
}(base_class_1.BaseClass));
exports.Batchinator = Batchinator;
