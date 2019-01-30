import { BaseClass } from '@writetome51/base-class';


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

export declare class Batchinator extends BaseClass {

	totalDataCount: number;
	itemsPerBatch: number;
	itemsPerPage: number;

	readonly currentBatchNumber: number;
	readonly totalBatches: number;
	readonly totalPages: number;
	readonly pagesPerBatch: number;

	private __itemsPerBatch;
	private __totalDataCount;
	private __currentBatchNumber;
	private __itemsPerPage;


	constructor();


	set_currentBatchNumber_basedOnPage(pageNumber: number): void;


	currentBatchContainsPage(pageNumber: number): boolean;


	getBatchNumberContainingPage(pageNumber: number): number;


	getCurrentPageNumberForPaginator(pageNumber: number): number;
}
