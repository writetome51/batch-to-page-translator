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
// Now test the same function using different values of data total, items per page and items per batch:
dataSource.dataTotal = 1021;
pageInfo.itemsPerPage = 13;
batchInfo.itemsPerBatch = 26;
// Make sure the minimum value gets correct result:
batchNumber = bch2pgTranslator.getBatchNumberContainingPage(1);
if (batchNumber === 1)
    console.log('test 6 passed');
else
    console.log('test 6 FAILED');
// Make sure the maximum value gets correct result:
batchNumber = bch2pgTranslator.getBatchNumberContainingPage(79);
if (batchNumber === 40)
    console.log('test 7 passed');
else
    console.log('test 7 FAILED');
// Make sure 1 below minimum value triggers error.
errorTriggered = false;
try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(0);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 8 passed');
else
    console.log('test 8 FAILED');
// Make sure 1 above maximum value triggers error.
errorTriggered = false;
try {
    batchNumber = bch2pgTranslator.getBatchNumberContainingPage(80);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 9 passed');
else
    console.log('test 9 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(1);
if (batchInfo.currentBatchNumber === 1)
    console.log('test 10 passed');
else
    console.log('test 10 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(31);
if (batchInfo.currentBatchNumber === 16)
    console.log('test 11 passed');
else
    console.log('test 11 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(79);
if (batchInfo.currentBatchNumber === 40)
    console.log('test 12 passed');
else
    console.log('test 12 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(78);
if (bch2pgTranslator.currentBatchContainsPage(78))
    console.log('test 13 passed');
else
    console.log('test 13 FAILED');
if (bch2pgTranslator.currentBatchContainsPage(79))
    console.log('test 14 FAILED');
else
    console.log('test 14 passed');
errorTriggered = false;
try {
    bch2pgTranslator.currentBatchContainsPage(80);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 15 passed');
else
    console.log('test 15 FAILED');
batchInfo.currentBatchNumber = undefined;
if (bch2pgTranslator.currentBatchContainsPage(78))
    console.log('test 16 FAILED');
else
    console.log('test 16 passed');
// Now test method getPageNumberInCurrentBatchFromAbsolutePage():
errorTriggered = false;
try {
    bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(1);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 17 passed');
else
    console.log('test 17 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(1);
var pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(1);
if (pageNum === 1)
    console.log('test 18 passed');
else
    console.log('test 18 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(5);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(5);
if (pageNum === 1)
    console.log('test 19 passed');
else
    console.log('test 19 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(6);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(6);
if (pageNum === 2)
    console.log('test 20 passed');
else
    console.log('test 20 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(78);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(78);
if (pageNum === 2)
    console.log('test 21 passed');
else
    console.log('test 21 FAILED');
// Now test the same function using different values of items per page and items per batch:
dataSource.dataTotal = 1021;
pageInfo.itemsPerPage = 20;
batchInfo.itemsPerBatch = 100;
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(1);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(1);
if (pageNum === 1)
    console.log('test 22 passed');
else
    console.log('test 22 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(25);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(25);
if (pageNum === 5)
    console.log('test 23 passed');
else
    console.log('test 23 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(26);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(26);
if (pageNum === 1)
    console.log('test 24 passed');
else
    console.log('test 24 FAILED');
bch2pgTranslator.set_currentBatchNumber_toBatchContainingPage(52);
pageNum = bch2pgTranslator.getPageNumberInCurrentBatchFromAbsolutePage(52);
if (pageNum === 2)
    console.log('test 25 passed');
else
    console.log('test 25 FAILED');
