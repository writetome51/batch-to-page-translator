/********************
 This class is intended to help a separate Paginator paginate a dataset too big to
 be stored in memory all at once.  The amount of data that can stored in memory at
 once is referred to here as a 'load', which can be multiple pages of data.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which load page 10 is in and tell the Paginator what page to show.
 *******************/

export declare class LoadToPageTranslator {

	private __pageInfo;
	private __loadInfo;


	constructor(
		__pageInfo: {
			getTotalPages: () => number;
		},
		__loadInfo: {
			getCurrentLoadNumber: () => number;
			getPagesPerLoad: () => number;
		}
	);


	getLoadNumberOfPage(pageNumber: number): number;


	loadContainsPage(pageNumber: number, loadNumber: number): boolean;


	getPageNumberOfLoadFromAbsolutePage(pageNumber: number): number;

}
