import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { hasValue } from '@writetome51/has-value-no-value';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 Has properties that give information about a dataset too big to be loaded all at once that
 is stored in memory one batch at-a-time, with the intention of paginating the batch.
 *******************/


export class PaginationBatchInfo extends BaseClass {

	// `itemsPerBatch` must be set before doing anything else with the class.
	// itemsPerBatch  (total number of items the paginator can handle at once.)
	// currentBatchNumber

	// currentBatchNumberIsLast : boolean  (read-only)
	// totalBatches  (read-only)
	// pagesPerBatch  (read-only)

	private __itemsPerBatch: number;
	private __currentBatchNumber: number;


	constructor(
		private __pageInfo: {itemsPerPage: number, totalPages: number}
	) {
		super();
	}


	set itemsPerBatch(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');

		this.__checkValueOf_itemsPerBatch(value);
	}


	get itemsPerBatch(): number {
		this._errorIfPropertyHasNoValue('__itemsPerBatch', 'itemsPerBatch');

		this.__checkValueOf_itemsPerBatch();
		return this.__itemsPerBatch;
	}


	set currentBatchNumber(value) {
		if (not(inRange([1, this.totalBatches], value))) {
			throw new Error(`You cannot set "currentBatchNumber" to a value outside the range 
			of "totalBatches"`);
		}
		this.__currentBatchNumber = value;
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	get currentBatchNumberIsLast(): boolean {
		return (this.currentBatchNumber === this.totalBatches);
	}


	get totalBatches(): number {
		return getRoundedUp(this.__pageInfo.totalPages / this.pagesPerBatch);
	}


	get pagesPerBatch(): number {
		// Should not have to be rounded.  They will divide evenly.
		return (this.itemsPerBatch / this.__pageInfo.itemsPerPage);
	}


	private __errorIfValueIsNotOneOrGreater(value, property): void {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The property "${property}" must be at least 1.`);
	}


	private __checkValueOf_itemsPerBatch(newValue = undefined) {
		let oldValue = this.__itemsPerBatch;
		if (hasValue(newValue)) this.__itemsPerBatch = newValue;

		this.__ensure_itemsPerBatch_isCompatibleWith_itemsPerPage();

		// Whenever itemsPerBatch changes, there can no longer be a currentBatchNumber.  This would
		// cause logic errors.  It must be unset so the user is forced to reset it.

		if (oldValue !== this.__itemsPerBatch) this.__currentBatchNumber = undefined;
	}


	// If itemsPerBatch / itemsPerPage does not divide evenly, itemsPerBatch is decremented until
	// they do.  So, sometimes after assigning a value to either itemsPerPage or itemsPerBatch,
	// itemsPerBatch will change slightly.

	private __ensure_itemsPerBatch_isCompatibleWith_itemsPerPage(): void {

		if (hasValue(this.__pageInfo.itemsPerPage)) {
			if (this.__itemsPerBatch < this.__pageInfo.itemsPerPage) {
				throw new Error(
					`The property "itemsPerBatch" cannot be less than "itemsPerPage"`
				);
			}
			while ((this.__itemsPerBatch % this.__pageInfo.itemsPerPage) !== 0) --this.__itemsPerBatch;
		}

	}


}
