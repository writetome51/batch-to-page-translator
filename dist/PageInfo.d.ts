import { ArrayPaginator } from '@writetome51/array-paginator';
import { BaseClass } from '@writetome51/base-class';
/********************
 This class is intended to help a separate Paginator class paginate data.
Specifically, this class contains the properties `itemsPerPage` and `totalPages`, which will
be used by other classes, like the Paginator.
 *******************/
export declare class PageInfo extends BaseClass {
    private __dataSource;
    private __arrPaginator;
    constructor(__dataSource: {
        dataTotal: number;
    }, __arrPaginator: ArrayPaginator);
    itemsPerPage: number;
    readonly totalPages: number;
}
