import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { noValue } from '@writetome51/has-value-no-value';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be saved
 in-memory one batch at-a-time, where each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in, tell the data-fetching tool what batch
 to fetch, and tell the Paginator what page to show.
 *******************/


export class Batchinator extends BaseClass {

	// These first 3 properties must be set before doing anything else:
	// totalItems;  (must be set first)
	// itemsPerPage;  (must be set second)
	// itemsPerBatch; (total number of items the Paginator can handle at once.)

	// currentBatchNumber  (read-only);
	// totalBatches  (read-only);
	// totalPages  (read-only);
	// pagesPerBatch  (read-only);

	private __totalItems: number;
	private __itemsPerPage: number;
	private __itemsPerBatch: number;
	private __currentBatchNumber: number;


	set totalItems(value) {
		this.__errorIfValueForPropertyIsNotOneOrGreater(value, 'totalItems');

		this.__totalItems = value;
	}


	get totalItems(): number {
		this.__errorIfPropertyHasNoValue('totalItems');
		return this.__totalItems;
	}


	set itemsPerPage(value) {
		this.__errorIfValueForPropertyIsNotOneOrGreater(value, 'itemsPerPage');
		if (value > this.totalItems) {
			throw new Error(`The property "itemsPerPage" cannot be a larger number than "totalItems"`);
		}
		this.__itemsPerPage = value;
	}


	get itemsPerPage(): number {
		this.__errorIfPropertyHasNoValue('itemsPerPage');
		return this.__itemsPerPage;
	}


	set itemsPerBatch(value) {
		this.__errorIfValueForPropertyIsNotOneOrGreater(value, 'itemsPerBatch');
		this.__itemsPerBatch = value;
		if ((this.__itemsPerBatch % this.itemsPerPage) !== 0) {
			throw new Error(`The property "itemsPerBatch" must be evenly divisible by "itemsPerPage"`);
		}
		this.__keep_itemsPerBatch_noGreaterThan_totalItems();
		this.__ifNotEvenlyDivisibleBy_itemsPerPage_decrement_itemsPerBatch_until_it_is();
	}


	get itemsPerBatch(): number {
		this.__errorIfPropertyHasNoValue('itemsPerBatch');
		this.__keep_itemsPerBatch_noGreaterThan_totalItems();
		this.__ifNotEvenlyDivisibleBy_itemsPerPage_decrement_itemsPerBatch_until_it_is();
		return this.__itemsPerBatch;
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	get totalBatches(): number {
		return getRoundedUp(this.totalPages / this.pagesPerBatch);
	}


	get totalPages(): number {
		return getRoundedUp(this.totalItems / this.itemsPerPage);
	}


	get pagesPerBatch(): number {
		return getRoundedUp(this.itemsPerBatch / this.itemsPerPage);
	}


	set_currentBatchNumber_basedOnPage(pageNumber): void {
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
		return getRoundedUp(pageNumber / this.pagesPerBatch);
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


	private __keep_itemsPerBatch_noGreaterThan_totalItems(): void {
		if (this.__itemsPerBatch > this.totalItems) this.__itemsPerBatch = this.totalItems;
	}


	private __ifNotEvenlyDivisibleBy_itemsPerPage_decrement_itemsPerBatch_until_it_is(): void {
		while ((this.__itemsPerBatch % this.itemsPerPage) !== 0) {
			--this.__itemsPerBatch;
		}
	}


	private __errorIfPropertyHasNoValue(property): void {
		if (noValue(this[`__${property}`])) {
			throw new Error(`The property "${property}" must be given a value first.`);
		}
	}


	private __errorIfValueForPropertyIsNotOneOrGreater(value, property): void {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The property "${property}" must be at least 1.`);
	}


}
