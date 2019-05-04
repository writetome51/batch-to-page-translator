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
/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 *******************/
var BatchInfo = /** @class */ (function (_super) {
    __extends(BatchInfo, _super);
    function BatchInfo(__dataSource, __pageInfo) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        _this.__pageInfo = __pageInfo;
        return _this;
    }
    Object.defineProperty(BatchInfo.prototype, "itemsPerBatch", {
        get: function () {
            this._errorIfPropertyHasNoValue('__itemsPerBatch', 'itemsPerBatch');
            return this.__itemsPerBatch;
        },
        // If itemsPerBatch / itemsPerPage does not divide evenly, BatchToPageTranslator decrements
        // itemsPerBatch until they do.  So, sometimes after assigning a value to either itemsPerPage
        // or itemsPerBatch, itemsPerBatch will change slightly.
        set: function (value) {
            this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
            this.__itemsPerBatch = value;
            // Since itemsPerBatch is changing, there can no longer be a 'current batch number'.  This would
            // cause buggy behavior.  The user must call this.set_currentBatchNumber_basedOnPage() to
            // reset this.currentBatchNumber.
            this.__currentBatchNumber = undefined;
            if (has_value_no_value_1.hasValue(this.__pageInfo.itemsPerPage)) {
                if (this.__itemsPerBatch < this.__pageInfo.itemsPerPage) {
                    throw new Error("The property \"itemsPerBatch\" cannot be less than \"itemsPerPage\"");
                }
                while ((this.__itemsPerBatch % this.__pageInfo.itemsPerPage) !== 0)
                    --this.__itemsPerBatch;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchInfo.prototype, "currentBatchNumber", {
        get: function () {
            return this.__currentBatchNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchInfo.prototype, "currentBatchNumberIsLast", {
        get: function () {
            return (this.currentBatchNumber === this.totalBatches);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchInfo.prototype, "totalBatches", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.totalPages / this.pagesPerBatch);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BatchInfo.prototype, "pagesPerBatch", {
        get: function () {
            // Should not have to be rounded.  They will divide evenly.
            return (this.itemsPerBatch / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    BatchInfo.prototype.__errorIfValueIsNotOneOrGreater = function (value, property) {
        error_if_not_integer_1.errorIfNotInteger(value);
        if (value < 1)
            throw new Error("The property \"" + property + "\" must be at least 1.");
    };
    return BatchInfo;
}(base_class_1.BaseClass));
exports.BatchInfo = BatchInfo;
