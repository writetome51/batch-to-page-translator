import { BaseClass } from '@writetome51/base-class';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { hasValue, noValue } from '@writetome51/has-value-no-value';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { PaginationPageInfo } from './PaginationPageInfo';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/


export class BatchToPageTranslator extends BaseClass {


	// currentBatchNumber  (read-only)
	// currentBatchNumberIsLast : boolean  (read-only)

	private __itemsPerBatch: number;
	private __currentBatchNumber: number;


	constructor(
		private __dataSource: {

			// dataTotal: number of items in entire dataset, not the batch.
			// This must stay accurate after any actions that change the total, such as searches.

			dataTotal: number;
		},

		private __paginationPageInfo: PaginationPageInfo
	) {
		super();
	}


	set_currentBatchNumber_basedOnPage(pageNumber): void {
		this.__currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
	}


	getBatchNumberContainingPage(pageNumber): number {

		if (not(inRange([1, this.__paginationPageInfo.totalPages], pageNumber))) {
			throw new Error('The requested page does not exist.');
		}
		return getRoundedUp(pageNumber / this.pagesPerBatch);
	}


	currentBatchContainsPage(pageNumber): boolean {
		if (noValue(this.currentBatchNumber)) return false;
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		return (this.currentBatchNumber === batchNumber);
	}


	// Because the Paginator is not designed for handling batches (we assume), we have to translate
	// the passed pageNumber into a different number, returned by this function, which is the page
	// number the Paginator needs to show.

	getCurrentPageNumberForPaginator(pageNumber): number {
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		if (this.currentBatchNumber !== batchNumber) {
			throw new Error(`The property "currentBatchNumber" is not set to the batch number 
			that contains the passed pageNumber. Call this.set_currentBatchNumber_basedOnPage(pageNumber)
			before calling this function.`);
		}
		return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
	}


}
