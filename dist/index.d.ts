/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/

export declare class BatchToPageTranslator {


	private __pageInfo;
	private __batchInfo;


	constructor(
		__pageInfo: {
			totalPages: number;
		},
		__batchInfo: {
			currentBatchNumber: number;
			pagesPerBatch: number;
		}
	);


	set_currentBatchNumber_toBatchContainingPage(pageNumber: number): void;


	getBatchNumberContainingPage(pageNumber: number): number;


	currentBatchContainsPage(pageNumber: number): boolean;


	getPageNumberInCurrentBatchFromAbsolutePage(pageNumber: number): number;

}
