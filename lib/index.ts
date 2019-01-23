import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { AppPaginator } from '@writetome51/app-paginator';

// This class is for paginating data batches that can only be saved in-memory one-at-a-time, taken from a
// much bigger data set that can't be completely fetched all at once.  A single batch is measured by the
// number of pages it has.
// If the user is clicking thru pagination controls and clicks to page 10, for instance, it's this
// class' job to figure out which batch page 10 is in, get that batch saved in-memory, and make sure that
// this.__paginator.currentPage contains the correct items.

export class BatchPaginator {

	// totalBatches : number;
	totalItems: number; // number items in ENTIRE data set.
	pagesPerBatch = 20;
	private __currentBatchNumber: number;


	constructor(private __paginator: AppPaginator) {
	}


	get totalBatches(): number {
		let totalPages = getRoundedUp(this.totalItems / this.__paginator.itemsPerPage);
		return getRoundedUp(totalPages / this.pagesPerBatch);
	}


	// Giving this a value automatically updates this.__paginator.data .

	set currentBatchNumber(value) {
		this.__currentBatchNumber = value;
		this.__paginator.data = this.__getNewBatch(value);
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	private __getNewBatch(batchNumber): any[] {
		// put code here that fetches the batch from another service,
		// and returns it.
	}


	private __getBatchNumberContainingPageNumber(num) {

	}


}