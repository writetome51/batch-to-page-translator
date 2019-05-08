import { arraysMatch } from '@writetome51/arrays-match';
import { PaginationPageInfo } from '@writetome51/pagination-page-info';
import { PaginationBatchInfo } from '@writetome51/pagination-batch-info';
import { BatchToPageTranslator } from './index';

// Setup dependencies of PaginationPageInfo:
let dataSource = {dataTotal: 50};
let batchPaginator = {itemsPerPage: 10};
let pageInfo = new PaginationPageInfo(dataSource, batchPaginator);

// Pass PaginationPageInfo into PaginationBatchInfo:
let batchInfo = new PaginationBatchInfo(pageInfo);

// Create BatchToPageTranslator test instance:
let bch2pgTranslator = new BatchToPageTranslator(pageInfo, batchInfo);

// batchInfo.itemsPerBatch must be set before doing anything else:
batchInfo.itemsPerBatch = 10;


// Start by testing the method getBatchNumberContainingPage():


// Make sure the minimum value gets correct result:
let batchNumber = bch2pgTranslator.getBatchNumberContainingPage(1);
if (batchNumber === 1) console.log('test 1 passed');
else console.log('test 1 FAILED');

// Make sure the maximum value gets correct result:
batchNumber = bch2pgTranslator.getBatchNumberContainingPage(5);
if (batchNumber === 5) console.log('test 2 passed');
else console.log('test 2 FAILED');

// Make sure 1 below minimum value triggers error.
let errorTriggered = false;
try{
	batchNumber = bch2pgTranslator.getBatchNumberContainingPage(0);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 3 passed');
else console.log('test 3 FAILED');

// Make sure 1 above maximum value triggers error.
errorTriggered = false;
try{
	batchNumber = bch2pgTranslator.getBatchNumberContainingPage(6);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 4 passed');
else console.log('test 4 FAILED');

// Make sure negative number triggers error.
errorTriggered = false;
try{
	batchNumber = bch2pgTranslator.getBatchNumberContainingPage(-1);
}
catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 5 passed');
else console.log('test 5 FAILED');


