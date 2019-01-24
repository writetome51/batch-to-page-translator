import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from './index';


export class PaginationDataController extends BaseClass {

	constructor(
		private __batchinator: Batchinator,
		private __paginator: { currentPageNumber: number, itemsPerPage: number },
		private __dataService
	) {
		super();
		// @ts-ignore
		this.__batchinator.totalDataCount = this.__dataService.getTotalDataCount();
		// @ts-ignore
		this.__batchinator.pagesPerBatch = 20;
		this.__paginator.data = this.__getData();
		this.__batchinator.currentPageNumber = 1;
	}


	private __getData() {
		return this.__dataService.getData(
			this.__batchinator.currentBatchNumber,
			// @ts-ignore
			(this.__batchinator.pagesPerBatch * this.__paginator.itemsPerPage)
		);

	}


}
