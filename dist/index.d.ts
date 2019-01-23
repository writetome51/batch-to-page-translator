import { AppPaginator } from '@writetome51/app-paginator';


export declare class BatchPaginator {

	totalItems: number;
	pagesPerBatch: number;
	currentBatchNumber: number;
	readonly totalBatches: number;

	private __paginator;


	constructor(__paginator: AppPaginator);


}
