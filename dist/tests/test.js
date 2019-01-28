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
batchinator.totalDataCount = arr.length;
// @ts-ignore
batchinator.pagesPerBatch = 5;
// @ts-ignore
batchinator.itemsPerPage = 2;
console.log(batchinator.totalBatches);
console.log(batchinator.itemsPerBatch);
console.log(batchinator.totalPages);
