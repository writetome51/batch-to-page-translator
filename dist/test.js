"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pagination_page_info_1 = require("@writetome51/pagination-page-info");
var pagination_batch_info_1 = require("@writetome51/pagination-batch-info");
var index_1 = require("./index");
// Setup dependencies of PaginationPageInfo:
var dataSource = { dataTotal: 50 };
var batchPaginator = { itemsPerPage: 10 };
var pageInfo = new pagination_page_info_1.PaginationPageInfo(dataSource, batchPaginator);
// Pass PaginationPageInfo into PaginationBatchInfo:
var batchInfo = new pagination_batch_info_1.PaginationBatchInfo(pageInfo);
// Create BatchToPageTranslator test instance:
var bch2pgTranslator = new index_1.BatchToPageTranslator(pageInfo, batchInfo);
// batchInfo.itemsPerBatch must be set before doing anything else:
batchInfo.itemsPerBatch = 10;
// Start by testing the method getBatchNumberContainingPage():
// Make sure the minimum value gets correct result:
var batchNumber = bch2pgTranslator.getBatchNumberContainingPage(1);
if (batchNumber === 1)
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
// Make sure the maximum value gets correct result:
batchNumber = bch2pgTranslator.getBatchNumberContainingPage(5);
if (batchNumber === 5)
    console.log('test 2 passed');
else
    console.log('test 2 FAILED');
// Make sure 1 below minimum value triggers error.
var errorTriggered = false;
try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(0);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 3 passed');
else
    console.log('test 3 FAILED');
// Make sure 1 above maximum value triggers error.
errorTriggered = false;
try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(6);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
// Make sure negative number triggers error.
errorTriggered = false;
try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(-1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
