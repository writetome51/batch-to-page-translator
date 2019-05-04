import { BaseClass } from '@writetome51/base-class';
import { errorIfNotInteger } from 'error-if-not-integer';
import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { hasValue, noValue } from '@writetome51/has-value-no-value';
import { PaginationPageInfo } from './PaginationPageInfo';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 *******************/


export class BatchInfo extends BaseClass {

	// This must be set before doing anything else:
	// itemsPerBatch  (total number of items the Paginator can handle at once.)

	// currentBatchNumber  (read-only)
	// currentBatchNumberIsLast : boolean  (read-only)
	// totalBatches  (read-only)
	// pagesPerBatch  (read-only)

	private __itemsPerBatch: number;
	private __currentBatchNumber: number;


	constructor(
		private __dataSource: {

			// dataTotal: number of items in entire dataset, not the batch.
			// This must stay accurate after any actions that change the total, such as searches.

			dataTotal: number;
		},

		private __pageInfo:  PaginationPageInfo
	) {
		super();
	}


	// If itemsPerBatch / itemsPerPage does not divide evenly, BatchToPageTranslator decrements
	// itemsPerBatch until they do.  So, sometimes after assigning a value to either itemsPerPage
	// or itemsPerBatch, itemsPerBatch will change slightly.

	set itemsPerBatch(value) {
		this.__errorIfValueIsNotOneOrGreater(value, 'itemsPerBatch');
		this.__itemsPerBatch = value;

		// Since itemsPerBatch is changing, there can no longer be a 'current batch number'.  This would
		// cause buggy behavior.  The user must call this.set_currentBatchNumber_basedOnPage() to
		// reset this.currentBatchNumber.

		this.__currentBatchNumber = undefined;

		if (hasValue(this.__pageInfo.itemsPerPage)) {
			if (this.__itemsPerBatch < this.__pageInfo.itemsPerPage) {
				throw new Error(
					`The property "itemsPerBatch" cannot be less than "itemsPerPage"`
				);
			}
			while ((this.__itemsPerBatch % this.__pageInfo.itemsPerPage) !== 0) --this.__itemsPerBatch;
		}
	}


	get itemsPerBatch(): number {
		this._errorIfPropertyHasNoValue('__itemsPerBatch',  'itemsPerBatch');
		return this.__itemsPerBatch;
	}


	get currentBatchNumber(): number {
		return this.__currentBatchNumber;
	}


	get currentBatchNumberIsLast() {
		return (this.currentBatchNumber === this.totalBatches);
	}


	get totalBatches(): number {
		return getRoundedUp(this.totalPages / this.pagesPerBatch);
	}


	get pagesPerBatch(): number {
		// Should not have to be rounded.  They will divide evenly.
		return (this.itemsPerBatch / this.itemsPerPage);
	}


	private __errorIfValueIsNotOneOrGreater(value, property): void {
		errorIfNotInteger(value);
		if (value < 1) throw new Error(`The property "${property}" must be at least 1.`);
	}


}
