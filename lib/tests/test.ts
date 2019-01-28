import { AppPaginator } from '@writetome51/app-paginator';
import {Batchinator} from '../index';

// Setup test data:
let arr = [];
let i = 0;
while (++i <= 50) {
	arr.push(i);
}

// Setup batchinator:
let batchinator = new Batchinator();
// @ts-ignore
batchinator.totalDataCount = arr.length;
// @ts-ignore
batchinator.pagesPerBatch = 5;
// @ts-ignore
batchinator.itemsPerPage = 2;

console.log(batchinator.totalBatches);
console.log(batchinator.itemsPerBatch);
console.log(batchinator.totalPages);