import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 This class is for paginating data batches that can only be saved in-memory one batch
 at-a-time, where each batch is taken from a much bigger data set that can't be
 completely fetched all at once.
 A single batch is measured by the number of pages it has.

 An example: if the user is clicking thru pagination controls and clicks to page 10,
 it's this class' job to figure out which batch page 10 is in and tell this.__paginator
 what page to currently be showing.

 It's not this class' responsibility to actually fetch the data from a db or file,
 or assign the current batch to this.__paginator.data.  It does not handle the data.
 Because of this, the same paginator instance in this.__paginator must also be manipulated elsewhere.
 *******************/


export class Batchinator extends BaseClass {

	// totalBatches : number (read-only)
	// totalPages: number (read-only)
	// currentBatchNumber: number;
	// currentPageNumber: number;
	// totalDataCount: number;
	// pagesPerBatch = 20;

	private __pagesPerBatch = 20;
	private __totalDataCount: number;
	private __currentBatchNumber: number;
	private __currentPageNumber: number;


	constructor(
		private __paginator: { currentPageNumber: number, itemsPerPage: number }
	) {
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
		// @ts-ignore
		return getRoundedUp(this.totalPages / this.pagesPerBatch);
	}


	get totalPages(): number {
		// @ts-ignore
		return getRoundedUp(this.totalDataCount / this.__paginator.itemsPerPage);
	}


	// Automatically updates this.currentBatchNumber to the batch that contains that page.
	// Also updates this.__paginator.currentPageNumber.

	set currentPageNumber(pageNumber) {
		this.currentBatchNumber = this.__getBatchNumberContainingPageNumber(pageNumber);
		this.__currentPageNumber = pageNumber;
		this.__paginator.currentPageNumber = this.__getTranslatedPageNumberForPaginator(pageNumber);
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
	}


	set currentBatchNumber(value) {
		errorIfNotInteger(value);
		if (not(inRange([1, this.totalBatches], value))) {
			throw new Error(
				`You attempted to set the property "currentBatchNumber" to a value outside 
				the available range. It can be anything from 1 to the value of the "totalBatches" property.`
			);
		}
		this.__currentBatchNumber = value;
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	private __getBatchNumberContainingPageNumber(pageNumber): number {
		if (not(inRange([1, this.totalPages], pageNumber))) {
			throw new Error('The requested page does not exist.');
		}
		// @ts-ignore
		return getRoundedUp(pageNumber / this.pagesPerBatch);
	}


	// Because this.__paginator is not designed for handling batches, we have to translate
	// the requested pageNumber into a different number, which is then assigned to
	// this.paginator.currentPageNumber .

	private __getTranslatedPageNumberForPaginator(pageNumber) {
		// @ts-ignore
		return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
	}


}
