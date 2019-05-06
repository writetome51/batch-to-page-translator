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
var get_rounded_up_down_1 = require("@writetome51/get-rounded-up-down");
/********************
 Intended to help a separate Paginator class paginate data.
 Specifically, this class contains the properties `itemsPerPage` and `totalPages`, which will
 be used by other classes, like the Paginator.
 *******************/
var PaginationPageInfo = /** @class */ (function (_super) {
    __extends(PaginationPageInfo, _super);
    function PaginationPageInfo(__dataSource, 
    // Stores and paginates an array, which it assumes is the entire dataset.
    // We need this for its property 'itemsPerPage'.
    __arrPaginator) {
        var _this = _super.call(this) || this;
        _this.__dataSource = __dataSource;
        _this.__arrPaginator = __arrPaginator;
        return _this;
    }
    Object.defineProperty(PaginationPageInfo.prototype, "itemsPerPage", {
        get: function () {
            this._errorIfPropertyHasNoValue('__arrPaginator.itemsPerPage', 'itemsPerPage');
            return this.__arrPaginator.itemsPerPage;
        },
        set: function (value) {
            this.__arrPaginator.itemsPerPage = value; // validates value.
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationPageInfo.prototype, "totalPages", {
        get: function () {
            return get_rounded_up_down_1.getRoundedUp(this.__dataSource.dataTotal / this.itemsPerPage);
        },
        enumerable: true,
        configurable: true
    });
    return PaginationPageInfo;
}(base_class_1.BaseClass));
exports.PaginationPageInfo = PaginationPageInfo;
