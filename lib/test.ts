import { BatchCalculator } from './index';
import { arraysMatch } from '@writetome51/arrays-match';


let dataSource = {dataTotal: 50};
// Setup batchCalc:
let batchCalc = new BatchCalculator(dataSource);
// @ts-ignore
batchCalc.itemsPerBatch = 100;
// @ts-ignore
batchCalc.itemsPerPage = 5;


// Test 1: make sure 'totalBatches' is accurate:
if (batchCalc.totalBatches === 1) console.log('test 1 passed');
else console.log('test 1 FAILED');

// Test 2: make sure 'pagesPerBatch' is accurate:
// @ts-ignore
if (batchCalc.pagesPerBatch === 20) console.log('test 2 passed');
else console.log('test 2 FAILED');

// Test 3: make sure 'totalPages' is accurate:
if (batchCalc.totalPages === 10) console.log('test 3 passed');
else console.log('test 3 FAILED');


// Change values:
// @ts-ignore
batchCalc.itemsPerPage = 3;
// @ts-ignore
batchCalc.itemsPerBatch = 21;

// Test 4: make sure 'totalBatches' is accurate:
if (batchCalc.totalBatches === 3) console.log('test 4 passed');
else console.log('test 4 FAILED');

// Test 5: make sure 'pagesPerBatch' is accurate:
if (batchCalc.pagesPerBatch === 7) console.log('test 5 passed');
else console.log('test 5 FAILED');

// Test 6: make sure 'totalPages' is accurate:
if (batchCalc.totalPages === 17) console.log('test 6 passed');
else console.log('test 6 FAILED');


// Test 7: Make sure currentBatchNumber is undefined:
if (batchCalc.currentBatchNumber === undefined) console.log('test 7 passed');
else console.log('test 7 FAILED');

// Test 8: Make sure this.set_currentBatchNumber_toBatchContainingPage() sets currentBatchNumber correctly:
batchCalc.set_currentBatchNumber_basedOnPage(8);
if (batchCalc.currentBatchNumber === 2) console.log('test 8 passed');
else console.log('test 8 FAILED');

// Test 9: Make sure this.set_currentBatchNumber_toBatchContainingPage() sets currentBatchNumber correctly:
batchCalc.set_currentBatchNumber_basedOnPage(14);
if (batchCalc.currentBatchNumber === 2) console.log('test 9 passed');
else console.log('test 9 FAILED');

// Test 10: Make sure this.set_currentBatchNumber_toBatchContainingPage() sets currentBatchNumber correctly:
batchCalc.set_currentBatchNumber_basedOnPage(15);
if (batchCalc.currentBatchNumber === 3) console.log('test 10 passed');
else console.log('test 10 FAILED');

// Test 11: Should trigger an error, because it requests a page that doesnt exist:
let errorTriggered = false;
try {
	let batchNumber = batchCalc.getBatchNumberContainingPage(18);
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 11 passed');
else console.log('test 11 FAILED');


// Test 12: make sure this.getBatchNumberContainingPage(page) returns correct batch numbers:
let differentPages = [1, 7, 8, 14, 15, 17];
let expectedResults = [1, 1, 2, 2, 3, 3];
let results = [];
differentPages.forEach((page) => {
	results.push(batchCalc.getBatchNumberContainingPage(page));
});
if (arraysMatch(expectedResults, results)) console.log('test 12 passed');
else console.log('test 12 FAILED');


// Test 13: test this.getPageNumberInCurrentBatchFromAbsolutePage()
differentPages = [1, 7, 8, 14, 15, 17];
expectedResults = [1, 7, 1, 7, 1, 3];
results = [];
differentPages.forEach((page) => {
	batchCalc.set_currentBatchNumber_basedOnPage(page);
	results.push(batchCalc.getCurrentPageNumberForPaginator(page));
});
if (arraysMatch(expectedResults, results)) console.log('test 13 passed');
else console.log('test 13 FAILED');


// Make sure errors are triggered when assigning properties illegal values:

errorTriggered = false;
try {
	// @ts-ignore
	batchCalc.itemsPerPage = 0;
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 16 passed');
else console.log('test 16 FAILED');


errorTriggered = false;
try {
	// @ts-ignore
	batchCalc.itemsPerBatch = '1';
} catch (e) {
	errorTriggered = true;
}
if (errorTriggered) console.log('test 17 passed');
else console.log('test 17 FAILED');


// Test 18
// current batch number is 3.
if (batchCalc.currentBatchContainsPage(17)) console.log('test 18 passed');
else console.log('test 18 FAILED');


// Test 19
// current batch number is 3.  Does not contain page 14.
if (batchCalc.currentBatchContainsPage(14)) console.log('test 19 FAILED');
else console.log('test 19 passed');


batchCalc.itemsPerBatch = 27;
batchCalc.itemsPerPage = 25; //  itemsPerBatch will change to 25 also.

// Test 20:  make sure when dataSource is updated externally its changes show up in BatchCalculator:
dataSource.dataTotal = 109;
if (batchCalc.totalBatches === 5) console.log('test 20 passed');
else console.log('test 20 FAILED');


if (batchCalc.totalPages === 5) console.log('test 21 passed');
else console.log('test 21 FAILED');
