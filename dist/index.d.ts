import { BaseClass } from '@writetome51/base-class';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/

export declare class BatchCalculator extends BaseClass {


	itemsPerPage: number;
	itemsPerBatch: number;

	readonly currentBatchNumber: number;
	readonly currentBatchNumberIsLast: boolean;
	readonly totalBatches: number;
	readonly totalPages: number;
	readonly pagesPerBatch: number;

	private __dataSource;
	private __itemsPerBatch;
	private __itemsPerPage;
	private __currentBatchNumber;


	constructor(__dataSource: {
		dataTotal: number;
	});


	set_currentBatchNumber_basedOnPage(pageNumber: number): void;


	currentBatchContainsPage(pageNumber: number): boolean;


	getBatchNumberContainingPage(pageNumber: number): number;


	getCurrentPageNumberForPaginator(pageNumber: number): number;


	private __errorIfPropertyHasNoValue;
	private __errorIfValueIsNotOneOrGreater;


}
