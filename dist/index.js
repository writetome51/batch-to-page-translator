"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var base_class_1 = require("@writetome51/base-class");
var errorIfNotInteger_1 = require("basic-data-handling/errorIfNotInteger");
var not_1 = require("@writetome51/not");
var in_range_1 = require("@writetome51/in-range");
// This class is for paginating data batches that can only be saved in-memory one-at-a-time,
// taken from a much bigger data set that can't be completely fetched all at once.  A single
// batch is measured by the number of pages it has.
// If the user is clicking thru pagination controls and clicks to page 10, for instance,
// it's this class' job to figure out which batch page 10 is in, get that batch saved
// in-memory, and make sure that this.paginator.currentPage contains the correct items.
var Batchinator = /** @class */ (function (_super) {
    __extends(Batchinator, _super);
    function Batchinator(paginator) {
        var _this = _super.call(this) || this;
        _this.paginator = paginator;
        // totalBatches : number (read-only)
        // totalPages: number (read-only)
        // currentBatchNumber: number;
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
            return get_rounded_up_down_1.getRoundedUp(this.totalPages / this.__pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "totalPages", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.__totalDataCount / this.paginator.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Batchinator.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        // Giving this a value automatically updates this.paginator.data .
        set: function (value) {
            this.__currentBatchNumber = value;
            this.paginator.data = this.__getNewBatch(value);
        },
        enumerable: true,
        configurable: true
    });
    Batchinator.prototype.__getBatchNumberContainingPageNumber = function (num) {
        if (not_1.not(in_range_1.inRange([1, this.totalPages], num)))
            throw new Error('The requested page does not exist.');
        return get_rounded_up_down_1.getRoundedUp(num / this.__pagesPerBatch);
    };
    Batchinator.prototype.__getNewBatch = function (batchNumber) {
        // put code here that fetches the batch from another service,
        // and returns it.
    };
    return Batchinator;
}(base_class_1.BaseClass));
exports.Batchinator = Batchinator;
