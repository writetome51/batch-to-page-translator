import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { AppPaginator } from '@writetome51/app-paginator';
import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { not } from '@writetome51/not';
import { inRange } from '@writetome51/in-range';

// This class is for paginating data batches that can only be saved in-memory one-at-a-time,
// taken from a much bigger data set that can't be completely fetched all at once.  A single
// batch is measured by the number of pages it has.
// If the user is clicking thru pagination controls and clicks to page 10, for instance,
// it's this class' job to figure out which batch page 10 is in, get that batch saved
// in-memory, and make sure that this.paginator.currentPage contains the correct items.

export class Batchinator extends BaseClass {

	// totalBatches : number (read-only)
	// totalPages: number (read-only)
	// currentBatchNumber: number;
	// totalDataCount: number;
	// pagesPerBatch = 20;

	private __pagesPerBatch = 20;
	private __totalDataCount: number;
	private __currentBatchNumber: number;


	constructor(public paginator: AppPaginator) {
		super();

		this._createGetterAndOrSetterForEach(
			['totalDataCount', 'pagesPerBatch'],
			{
				get_getterFunction: (property) => {
					return () => this[`__${property}`];
				},
				get_setterFunction: (property) => {
					return (value) => {
						errorIfNotInteger(value);
						if (value < 1) throw new Error(`The property "${property}" must be at least 1`);
						this[`__${property}`] = value;
					};
				}
			}
		);
	}


	get totalBatches(): number {
		return getRoundedUp(this.totalPages / this.__pagesPerBatch);
	}


	get totalPages(): number {
		return getRoundedUp(this.__totalDataCount / this.paginator.itemsPerPage);
	}


	// Giving this a value automatically updates this.paginator.data .

	set currentBatchNumber(value) {
		this.__currentBatchNumber = value;
		this.paginator.data = this.__getNewBatch(value);
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	private __getBatchNumberContainingPageNumber(num) {
		if (not(inRange([1, this.totalPages], num))) throw new Error('The requested page does not exist.');
		return getRoundedUp(num / this.__pagesPerBatch);
	}


	private __getNewBatch(batchNumber): any[] {
		// put code here that fetches the batch from another service,
		// and returns it.
	}


}
