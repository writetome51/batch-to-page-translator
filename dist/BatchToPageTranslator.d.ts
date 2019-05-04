import { BaseClass } from '@writetome51/base-class';
import { ArrayPaginator } from '@writetome51/array-paginator';
/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which batch page 10 is in and tell the Paginator what page to show.
 *******************/
export declare class BatchToPageTranslator extends BaseClass {
    private __dataSource;
    private __arrPaginator;
    private __itemsPerBatch;
    private __currentBatchNumber;
    constructor(__dataSource: {
        dataTotal: number;
    }, __arrPaginator: ArrayPaginator);
    set_currentBatchNumber_basedOnPage(pageNumber: any): void;
    getBatchNumberContainingPage(pageNumber: any): number;
    currentBatchContainsPage(pageNumber: any): boolean;
    getCurrentPageNumberForPaginator(pageNumber: any): number;
}
