"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
// Setup test data:
var arr = [];
var i = 0;
while (++i <= 50) {
    arr.push(i);
}
// Setup batchinator:
var batchinator = new index_1.Batchinator();
// @ts-ignore
batchinator.totalDataCount = arr.length; // 50 items
// @ts-ignore
batchinator.pagesPerBatch = 5;
// @ts-ignore
batchinator.itemsPerPage = 2;
// Test 1: make sure 'totalBatches' is accurate:
if (batchinator.totalBatches === 5)
    console.log('test 1 passed');
else
    console.log('test 1 FAILED');
// Test 2: make sure 'itemsPerBatch' is accurate:
if (batchinator.itemsPerBatch === 10)
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
batchinator.pagesPerBatch = 7;
// @ts-ignore
batchinator.itemsPerPage = 3;
// Test 4: make sure 'totalBatches' is accurate:
if (batchinator.totalBatches === 3)
    console.log('test 4 passed');
else
    console.log('test 4 FAILED');
// Test 5: make sure 'itemsPerBatch' is accurate:
if (batchinator.itemsPerBatch === 21)
    console.log('test 5 passed');
else
    console.log('test 5 FAILED');
// Test 6: make sure 'totalPages' is accurate:
if (batchinator.totalPages === 17)
    console.log('test 6 passed');
else
    console.log('test 6 FAILED');
// Make sure currentBatchNumber is initialized at 1:
if (batchinator.currentBatchNumber === 1)
    console.log('test 7 passed');
else
    console.log('test 7 FAILED');
// Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(8);
if (batchinator.currentBatchNumber === 2)
    console.log('test 8 passed');
else
    console.log('test 8 FAILED');
// Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(14);
if (batchinator.currentBatchNumber === 2)
    console.log('test 9 passed');
else
    console.log('test 9 FAILED');
// Make sure this.set_currentBatchNumber_basedOnPage() sets currentBatchNumber correctly:
batchinator.set_currentBatchNumber_basedOnPage(15);
if (batchinator.currentBatchNumber === 3)
    console.log('test 10 passed');
else
    console.log('test 10 FAILED');
