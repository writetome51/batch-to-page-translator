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
var error_if_not_integer_1 = require("error-if-not-integer");
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
var has_value_no_value_1 = require("@writetome51/has-value-no-value");
var in_range_1 = require("@writetome51/in-range");
var not_1 = require("@writetome51/not");
/********************
 Has properties that give information about a dataset too big to be loaded all at once that
 is stored in memory one batch at-a-time, with the intention of paginating the batch.
 *******************/
var PaginationBatchInfo = /** @class */ (function (_super) {
    __extends(PaginationBatchInfo, _super);
    function PaginationBatchInfo(__pageInfo) {
        var _this = _super.call(this) || this;
        _this.__pageInfo = __pageInfo;
        return _this;
    }
    Object.defineProperty(PaginationBatchInfo.prototype, "itemsPerBatch", {
        get: function () {
            this._errorIfPropertyHasNoValue('__itemsPerBatch', 'itemsPerBatch');
            this.__checkValueOf_itemsPerBatch();
            return this.__itemsPerBatch;
        },
        set: function (value) {
            this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
            this.__checkValueOf_itemsPerBatch(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationBatchInfo.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        set: function (value) {
            if (not_1.not(in_range_1.inRange([1, this.totalBatches], value))) {
                throw new Error("You cannot set \"currentBatchNumber\" to a value outside the range \n\t\t\tof \"totalBatches\"");
            }
            this.__currentBatchNumber = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationBatchInfo.prototype, "currentBatchNumberIsLast", {
        get: function () {
            return (this.currentBatchNumber === this.totalBatches);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationBatchInfo.prototype, "totalBatches", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.__pageInfo.totalPages / this.pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationBatchInfo.prototype, "pagesPerBatch", {
        get: function () {
            // Should not have to be rounded.  They will divide evenly.
            return (this.itemsPerBatch / this.__pageInfo.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    PaginationBatchInfo.prototype.__errorIfValueIsNotOneOrGreater = function (value, property) {
        error_if_not_integer_1.errorIfNotInteger(value);
        if (value < 1)
            throw new Error("The property \"" + property + "\" must be at least 1.");
    };
    PaginationBatchInfo.prototype.__checkValueOf_itemsPerBatch = function (newValue) {
        if (newValue === void 0) { newValue = undefined; }
        var oldValue = this.__itemsPerBatch;
        if (has_value_no_value_1.hasValue(newValue))
            this.__itemsPerBatch = newValue;
        this.__ensure_itemsPerBatch_isCompatibleWith_itemsPerPage();
        // Whenever itemsPerBatch changes, there can no longer be a currentBatchNumber.  This would
        // cause logic errors.  It must be unset so the user is forced to reset it.
        if (oldValue !== this.__itemsPerBatch)
            this.__currentBatchNumber = undefined;
    };
    // If itemsPerBatch / itemsPerPage does not divide evenly, itemsPerBatch is decremented until
    // they do.  So, sometimes after assigning a value to either itemsPerPage or itemsPerBatch,
    // itemsPerBatch will change slightly.
    PaginationBatchInfo.prototype.__ensure_itemsPerBatch_isCompatibleWith_itemsPerPage = function () {
        if (has_value_no_value_1.hasValue(this.__pageInfo.itemsPerPage)) {
            if (this.__itemsPerBatch < this.__pageInfo.itemsPerPage) {
                throw new Error("The property \"itemsPerBatch\" cannot be less than \"itemsPerPage\"");
            }
            while ((this.__itemsPerBatch % this.__pageInfo.itemsPerPage) !== 0)
                --this.__itemsPerBatch;
        }
    };
    return PaginationBatchInfo;
}(base_class_1.BaseClass));
exports.PaginationBatchInfo = PaginationBatchInfo;
