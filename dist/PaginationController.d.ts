import { BaseClass } from '@writetome51/base-class';
import { Batchinator } from './index';
export declare class PaginationController extends BaseClass {
    private __batchinator;
    private __paginator;
    constructor(__batchinator: Batchinator, __paginator: {
        currentPageNumber: number;
        itemsPerPage: number;
    });
}
