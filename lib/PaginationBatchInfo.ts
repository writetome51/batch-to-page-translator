import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { hasValue, noValue } from '@writetome51/has-value-no-value';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';
import { PaginationPageInfo } from './PaginationPageInfo';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 *******************/


export class PaginationBatchInfo extends BaseClass {

	// 'itemsPerBatch' must be set before doing anything else:
	// itemsPerBatch  (total number of items the Paginator can handle at once.)
	// currentBatchNumber

	// currentBatchNumberIsLast : boolean  (read-only)
	// totalBatches  (read-only)
	// pagesPerBatch  (read-only)

	private __itemsPerBatch: number;
	private __currentBatchNumber: number;


	constructor(
		private __pageInfo: PaginationPageInfo
	) {
		super();
	}


	set itemsPerBatch(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
		this.__itemsPerBatch = value;

		this.__ensure_itemsPerBatch_isCompatibleWith_itemsPerPage();

		// Whenever itemsPerBatch changes, there can no longer be a 'current batch number'.  This would
		// cause buggy behavior.  It must be reset after setting the value of this.__itemsPerBatch .

		this.__currentBatchNumber = undefined;
	}


	get itemsPerBatch(): number {
		this._errorIfPropertyHasNoValue('__itemsPerBatch', 'itemsPerBatch');

		let oldValue = this.__itemsPerBatch;
		this.__ensure_itemsPerBatch_isCompatibleWith_itemsPerPage();
		if (oldValue !== this.__itemsPerBatch) this.__currentBatchNumber = undefined;

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


	// If itemsPerBatch / itemsPerPage does not divide evenly, itemsPerBatch is decremented until
	// they do.  So, sometimes after assigning a value to either itemsPerPage or itemsPerBatch,
	// itemsPerBatch will change slightly.

	private __ensure_itemsPerBatch_isCompatibleWith_itemsPerPage() {

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
