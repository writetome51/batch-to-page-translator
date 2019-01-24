import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'basic-data-handling/errorIfNotInteger';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 This class is for paginating data that can only be saved in-memory one batch
 at-a-time, where each batch is taken from a much bigger data set that can't be
 completely fetched all at once.
 A single batch is measured by the number of pages it has.

 An example: if the user is clicking thru pagination controls and clicks to page 10,
 it's this class' job to figure out which batch page 10 is in and tell this.__paginator
 what page to currently be showing.

 It's not this class' responsibility to actually fetch the data from a db or file,
 or assign the current batch to this.__paginator .  It does not handle the data.
 Because of this, the same paginator instance in this.__paginator must also be
 manipulated elsewhere.
 *******************/


export class Batchinator extends BaseClass {

	// currentPageNumber: number;
	// totalDataCount: number;
	// pagesPerBatch = 20;
	// currentBatchNumber: number (read-only);
	// totalBatches : number (read-only)
	// totalPages: number (read-only)


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


	// The most important feature of this class.
	// Setting it automatically updates this.currentBatchNumber to the batch that contains that page.
	// Also updates this.__paginator.currentPageNumber so the correct page is displayed.

	set currentPageNumber(pageNumber) {
		this.__set__currentBatchNumber(this.__getBatchNumberContainingPageNumber(pageNumber));
		this.__currentPageNumber = pageNumber;
		this.__paginator.currentPageNumber = this.__getTranslatedPageNumberForPaginator(pageNumber);
	}


	get currentPageNumber(): number {
		return this.__currentPageNumber;
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
		return getRoundedUp(this.totalDataCount / this.__paginator.itemsPerPage);
	}


	private __set__currentBatchNumber(value) {
		errorIfNotInteger(value);
		if (not(inRange([1, this.totalBatches], value))) {
			throw new Error(
				`The property "currentBatchNumber" must be an integer from 1 to the value of 
				the "totalBatches" property.`
			);
		}
		this.__currentBatchNumber = value;
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
	// this.__paginator.currentPageNumber .

	private __getTranslatedPageNumberForPaginator(pageNumber) {
		// @ts-ignore
		return (pageNumber - ((this.currentBatchNumber - 1) * this.pagesPerBatch));
	}


}
