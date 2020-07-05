import { getRoundedUp } from '@writetome51/get-rounded-up-down';
import { noValue } from '@writetome51/has-value-no-value';
import { inRange } from '@writetome51/in-range';
import { not } from '@writetome51/not';


/********************
 This class is intended to help a separate Paginator paginate a dataset too big to
 be stored in memory all at once.  The amount of data that can stored in memory at
 once is referred to here as a 'load', which can be multiple pages of data.

 An example: if the user is clicking thru pagination controls and clicks to page 10, it's this
 class' job to figure out which load page 10 is in and tell the Paginator what page to show.
 *******************/


export class LoadToPageTranslator {


	constructor(
		private __pageInfo: { getTotalPages: () => number },
		private __loadInfo: { getCurrentLoadNumber: () => number, getPagesPerLoad: () => number }
	) {
	}


	getLoadNumberOfPage(pageNumber): number {
		if (this.__pageInfo.getTotalPages() < 1) throw new Error(
			'There is no load to get because the total number of pages is 0'
		);

		if (not(inRange([1, this.__pageInfo.getTotalPages()], pageNumber))) {
			throw new Error('The requested page does not exist.');
		}
		return getRoundedUp(pageNumber / this.__loadInfo.getPagesPerLoad());
	}


	loadContainsPage(pageNumber, loadNumber): boolean {
		if (noValue(loadNumber)) return false;
		let correctLoadNumber = this.getLoadNumberOfPage(pageNumber);
		return (loadNumber === correctLoadNumber);
	}


	// Takes `pageNumber` and translates it into a page of the current load.
	// Example: say pagesPerLoad is 10, the current load is 2, and `pageNumber` is 11. That
	// would be page 1 of load 2, so the function returns 1.

	getPageNumberOfLoadFromAbsolutePage(pageNumber): number {
		let loadNumber = this.getLoadNumberOfPage(pageNumber);
		if (this.__loadInfo.getCurrentLoadNumber() !== loadNumber) {
			throw new Error(`The current load does not contain the requested page`);
		}
		return (
			pageNumber -
			((this.__loadInfo.getCurrentLoadNumber() - 1) * this.__loadInfo.getPagesPerLoad())
		);
	}


}
