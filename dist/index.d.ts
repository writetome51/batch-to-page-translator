import { IPaginator } from '@writetome51/paginator-interface';
import { BaseClass } from '@writetome51/base-class';


/********************
 This class is for paginating data batches that can only be saved in-memory one batch
 at-a-time, where each batch is taken from a much bigger data set that can't be
 completely fetched all at once.
 A single batch is measured by the number of pages it has.

 An example: if the user is clicking thru pagination controls and clicks to page 10,
 it's this class' job to figure out which batch page 10 is in and tell this.__paginator
 what page to currently be showing.
 It's not this class' responsibility to actually fetch the data from a db,
 or assign the current batch to this.__paginator.data.  It does not handle the data.
 The same paginator instance in this.__paginator must also be manipulated elsewhere.
 *******************/

export declare class Batchinator extends BaseClass {

	readonly totalBatches: number;
	readonly totalPages: number;
	currentPageNumber: number;
	currentBatchNumber: number;

	private __paginator;
	private __pagesPerBatch;
	private __totalDataCount;
	private __currentBatchNumber;
	private __currentPageNumber;


	constructor(__paginator: IPaginator);


	private __getBatchNumberContainingPageNumber;
	private __getTranslatedPageNumberForPaginator;
}
