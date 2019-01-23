import { AppPaginator } from '@writetome51/app-paginator';
import { BaseClass } from '@writetome51/base-class';


export declare class Batchinator extends BaseClass {

	paginator: AppPaginator;
	readonly totalBatches: number;
	readonly totalPages: number;
	currentBatchNumber: number;

	private __pagesPerBatch;
	private __totalDataCount;
	private __currentBatchNumber;


	constructor(paginator: AppPaginator);


	private __getBatchNumberContainingPageNumber;
	private __getNewBatch;
}
