import { BaseClass } from '@writetome51/base-class';
import { PageInfo } from './PageInfo';
/********************
 This class is intended to help a separate Paginator class paginate data that can only be stored
 in memory one batch at-a-time, because each batch is taken from a much bigger data set that can't
 be completely fetched all at once.
 *******************/
export declare class BatchInfo extends BaseClass {
    private __dataSource;
    private __pageInfo;
    private __itemsPerBatch;
    private __currentBatchNumber;
    constructor(__dataSource: {
        dataTotal: number;
    }, __pageInfo: PageInfo);
    itemsPerBatch: number;
    readonly currentBatchNumber: number;
    readonly currentBatchNumberIsLast: boolean;
    readonly totalBatches: number;
    readonly pagesPerBatch: number;
    private __errorIfValueIsNotOneOrGreater;
}
