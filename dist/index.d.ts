import { BaseClass } from '@writetome51/base-class';


/********************
 This class is intended to help a separate Paginator class paginate data that can only be saved
 in-memory one batch at-a-time, where each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/
export declare class Batchinator extends BaseClass {
	private __dataSource;
	private __itemsPerBatch;
	private __itemsPerPage;
	private __currentBatchNumber;


	constructor(__dataSource: {
		dataTotal: number;
	});


	itemsPerBatch: number;
	itemsPerPage: number;
	readonly currentBatchNumber: number;
	readonly totalBatches: number;
	readonly totalPages: number;
	readonly pagesPerBatch: number;


	set_currentBatchNumber_basedOnPage(pageNumber: any): void;


	currentBatchContainsPage(pageNumber: any): boolean;


	getBatchNumberContainingPage(pageNumber: any): number;


	getCurrentPageNumberForPaginator(pageNumber: any): number;


	private __errorIfPropertyHasNoValue;
	private __errorIfValueIsNotOneOrGreater;
	private __errorIfNotEvenlyDivisibleByFive;
}
