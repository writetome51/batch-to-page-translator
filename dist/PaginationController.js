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
var PaginationDataController = /** @class */ (function (_super) {
    __extends(PaginationDataController, _super);
    function PaginationDataController(__batchinator, __paginator, __dataService) {
        var _this = _super.call(this) || this;
        _this.__batchinator = __batchinator;
        _this.__paginator = __paginator;
        _this.__dataService = __dataService;
        // @ts-ignore
        _this.__batchinator.totalDataCount = _this.__dataService.getTotalDataCount();
        // @ts-ignore
        _this.__batchinator.pagesPerBatch = 20;
        _this.__paginator.data = _this.__getData();
        _this.__batchinator.currentPageNumber = 1;
        return _this;
    }
    PaginationDataController.prototype.__getData = function () {
        return this.__dataService.getData(this.__batchinator.currentBatchNumber, 
        // @ts-ignore
        (this.__batchinator.pagesPerBatch * this.__paginator.itemsPerPage));
    };
    return PaginationDataController;
}(base_class_1.BaseClass));
exports.PaginationDataController = PaginationDataController;
