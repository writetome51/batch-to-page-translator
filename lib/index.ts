import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be saved
 in-memory one batch at-a-time, where each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 A single batch is measured by the number of pages it has.
 A batch is also defined as the total data the Paginator can handle all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in, tell the data-fetching tool what batch
 to fetch, and tell the Paginator what page to show.
 *******************/


export class Batchinator extends BaseClass {

	// The first 3 properties must be set before doing anything else:
	// totalDataCount; 
	// pagesPerBatch = 20;
	// itemsPerPage;  (the value should be gotten from the Paginator class)

	// currentBatchNumber  (read-only);
	// totalBatches  (read-only);
	// totalPages  (read-only);
	// itemsPerBatch  (read-only);


	private __pagesPerBatch = 20;
	private __totalDataCount: number;
	private __currentBatchNumber = 1;
	private __itemsPerPage: number;


	constructor() {
		super();

		this._createGetterAndOrSetterForEach(
			['totalDataCount', 'pagesPerBatch', 'itemsPerPage'],
			{
				get_getterFunction: (property) => {
					return () => {
						if (this[`__${property}`] === (null || undefined)) {
							throw new Error(`The property "${property}" must be given a value first.`);
						}
						return this[`__${property}`];
					};
				},
				get_setterFunction: (property) => {
					return (value) => {
						errorIfNotInteger(value);
						if (value < 1) throw new Error(`The property "${property}" must be at least 1.`);
						this[`__${property}`] = value;
					};
				}
			}
		);
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	get totalBatches(): number {
		// @ts-ignore
		return getRoundedUp(this.totalPages / this.pagesPerBatch);
	}


	get totalPages(): number {
		// @ts-ignore
		return getRoundedUp(this.totalDataCount / this.itemsPerPage);
	}


	get itemsPerBatch(): number {
		// @ts-ignore
		return this.itemsPerPage * this.pagesPerBatch;
	}


	set_currentBatchNumber_basedOnPage(pageNumber) {
		this.__currentBatchNumber = this.getBatchNumberContainingPage(pageNumber);
	}


	currentBatchContainsPage(pageNumber): boolean {
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		return (this.currentBatchNumber === batchNumber);
	}


	getBatchNumberContainingPage(pageNumber): number {
		if (not(inRange([1, this.totalPages], pageNumber))) {
			throw new Error('The requested page does not exist.');
		}
		// @ts-ignore
		return getRoundedUp(pageNumber / this.pagesPerBatch);
	}


	// Because the Paginator is not designed for handling batches (we assume), we have to translate
	// the passed pageNumber into a different number, returned by this function, which is the page
	// number the Paginator needs to show.

	getCurrentPageNumberForPaginator(pageNumber): number {
		let batchNumber = this.getBatchNumberContainingPage(pageNumber);
		if (this.currentBatchNumber !== batchNumber) {
			throw new Error(`The property "currentBatchNumber" is not set to the batch number 
			that contains the passed pageNumber. It must be before calling this
			function.`);
		}
		// @ts-ignore
		return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
	}


}
