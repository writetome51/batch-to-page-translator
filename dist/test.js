"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var arrays_match_1 = require("@writetome51/arrays-match");
var dataSource = { dataTotal: 50 };
// Setup batchinator:
var batchinator = new index_1.Batchinator(dataSource);
// @ts-ignore
batchinator.itemsPerBatch = 100;
// @ts-ignore
batchinator.itemsPerPage = 5;
// Test 1: make sure 'totalBatches' is accurate:
if (batchinator.totalBatches === 5)
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
// Test 2: make sure 'pagesPerBatch' is accurate:
// @ts-ignore
if (batchinator.pagesPerBatch === 5)
    console.log('test 2 passed');
else
    console.log('test 2 FAILED');
// Test 3: make sure 'totalPages' is accurate:
if (batchinator.totalPages === 25)
    console.log('test 3 passed');
else
    console.log('test 3 FAILED');
// Change values:
// @ts-ignore
batchinator.itemsPerPage = 3;
// @ts-ignore
batchinator.itemsPerBatch = 21;
// Test 4: make sure 'totalBatches' is accurate:
if (batchinator.totalBatches === 3)
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
// Test 5: make sure 'pagesPerBatch' is accurate:
if (batchinator.pagesPerBatch === 7)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
// Test 6: make sure 'totalPages' is accurate:
if (batchinator.totalPages === 17)
    console.log('test 6 passed');
else
    console.log('test 6 FAILED');
// Test 7: Make sure currentBatchNumber is initialized at 1:
if (batchinator.currentBatchNumber === 1)
    console.log('test 7 passed');
else
    console.log('test 7 FAILED');
// Test 8: Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(8);
if (batchinator.currentBatchNumber === 2)
    console.log('test 8 passed');
else
    console.log('test 8 FAILED');
// Test 9: Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(14);
if (batchinator.currentBatchNumber === 2)
    console.log('test 9 passed');
else
    console.log('test 9 FAILED');
// Test 10: Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(15);
if (batchinator.currentBatchNumber === 3)
    console.log('test 10 passed');
else
    console.log('test 10 FAILED');
// Test 11: Should trigger an error, because it requests a page that doesnt exist:
var errorTriggered = false;
try {
    var batchNumber = batchinator.getBatchNumberContainingPage(18);
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 11 passed');
else
    console.log('test 11 FAILED');
// Test 12: make sure this.getBatchNumberContainingPage(page) returns correct batch numbers:
var differentPages = [1, 7, 8, 14, 15, 17];
var expectedResults = [1, 1, 2, 2, 3, 3];
var results = [];
differentPages.forEach(function (page) {
    results.push(batchinator.getBatchNumberContainingPage(page));
});
if (arrays_match_1.arraysMatch(expectedResults, results))
    console.log('test 12 passed');
else
    console.log('test 12 FAILED');
// Test 13: test this.getCurrentPageNumberForPaginator()
differentPages = [1, 7, 8, 14, 15, 17];
expectedResults = [1, 7, 1, 7, 1, 3];
results = [];
differentPages.forEach(function (page) {
    batchinator.set_currentBatchNumber_basedOnPage(page);
    results.push(batchinator.getCurrentPageNumberForPaginator(page));
});
if (arrays_match_1.arraysMatch(expectedResults, results))
    console.log('test 13 passed');
else
    console.log('test 13 FAILED');
// Make sure errors are triggered when assigning properties illegal values:
errorTriggered = false;
try {
    // @ts-ignore
    var batchNumber = batchinator.totalDataCount = 1.5;
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 15 passed');
else
    console.log('test 15 FAILED');
errorTriggered = false;
try {
    // @ts-ignore
    var batchNumber = batchinator.itemsPerPage = 0;
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 16 passed');
else
    console.log('test 16 FAILED');
errorTriggered = false;
try {
    // @ts-ignore
    var batchNumber = batchinator.itemsPerBatch = '1';
}
catch (e) {
    errorTriggered = true;
}
if (errorTriggered)
    console.log('test 17 passed');
else
    console.log('test 17 FAILED');
// Test 18
// current batch number is 3.
if (batchinator.currentBatchContainsPage(17))
    console.log('test 18 passed');
else
    console.log('test 18 FAILED');
// Test 19
// current batch number is 3.
if (batchinator.currentBatchContainsPage(14))
    console.log('test 19 FAILED');
else
    console.log('test 19 passed');
// @ts-ignore
batchinator.totalDataCount = 20;
// @ts-ignore
batchinator.itemsPerPage = 25;
// @ts-ignore
batchinator.itemsPerBatch = 25;
// @ts-ignore
console.log(batchinator.itemsPerBatch);
