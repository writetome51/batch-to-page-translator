# BatchToPageTranslator

A TypeScript/JavaScript class intended to help a separate Paginator class paginate  
data that can only be stored in memory one batch at-a-time, because each batch is  
taken from a much bigger data set that can't be completely fetched all at once.   
A batch is defined as the amount of data the Paginator can handle at once.

An example: if the user is clicking thru pagination controls and clicks to page 10,  
it's this class' job to figure out which batch page 10 is in and tell the Paginator  
what page to show.

## Constructor
```ts
constructor(
    dataSource: {
        dataTotal: integer
            // number of items in entire dataset, not the batch.
            // This must stay accurate after any actions that change the total, 
            // such as searches.
    }
)
```


## Properties
```ts
// The first 2 properties, itemsPerPage and itemsPerBatch, must be set before doing 
// anything else.
// If itemsPerBatch / itemsPerPage does not divide evenly, 1 is subtracted
// from itemsPerBatch until they do.  So, sometimes after assigning a value to 
// either itemsPerPage or itemsPerBatch,  itemsPerBatch will change slightly.
    
itemsPerPage: integer

itemsPerBatch: integer
    // Total number of items the Paginator can handle at once.
    // Whenever its value is changed, this.currentBatchNumber becomes undefined.
    // You must call this.set_currentBatchNumber_basedOnPage() to
    // reset this.currentBatchNumber.

currentBatchNumber: integer (read-only)
    // This is set by calling this.set_currentBatchNumber_basedOnPage() .

currentBatchNumberIsLast: boolean  (read-only)

totalBatches: integer (read-only)

totalPages: integer (read-only)

pagesPerBatch: integer (read-only)

className : string (read-only)
    // Not important.  Inherited from BaseClass.
```

## Methods
```ts
set_currentBatchNumber_basedOnPage(pageNumber): void
    // Figures out the batch number that contains pageNumber, and
    // assigns it to this.currentBatchNumber .

currentBatchContainsPage(pageNumber): boolean
    // Useful if you need to find out if the batch containing pageNumber 
    // is already the currently loaded batch.

getBatchNumberContainingPage(pageNumber): number

getCurrentPageNumberForPaginator(pageNumber): number
    // We assume the Paginator doesn't know it's handling batches of a larger data set.
    // This function translates the passed `pageNumber` into the page number of the current batch, 
    // which it returns. This is the page number the Paginator needs to show.
    // Example:  say this.pagesPerBatch is 10. Say the user requests page 11. That page would be 
    // page 1 of batch 2.  You call this.set_currentBatchNumber_basedOnPage(11), fetch the 
    // batch, assign it to the Paginator, and call this.getCurrentPageNumberForPaginator(11). 
    // It will return 1. That's the page number Paginator must show.
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```ts	
protected   _createGetterAndOrSetterForEach(
                  propertyNames: string[],
                  configuration: IGetterSetterConfiguration
            ) : void
     /*********************
     Use this method when you have a bunch of properties that need getter and/or 
     setter functions that all do the same thing. You pass in an array of string 
     names of those properties, and the method attaches the same getter and/or 
     setter function to each property.
     IGetterSetterConfiguration is this object:
     {
         get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function,
             // get_setterFunction takes the property name as first argument and 
             // returns the setter function.  The setter function must take one 
             // parameter and return void.
     
         get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function
             // get_getterFunction takes the property name as first argument and 
             // returns the getter function.  The getter function must return something.
     }
     *********************/ 
   
   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.

protected   _runMethod_and_returnThis(
    callingObject, 
    method: Function, 
    methodArgs: any[], 
    additionalAction?: Function // takes the result returned by method as an argument.
) : this
```   

## Usage Example

```
export class AppPaginator {

	private __bch2pgTranslator: BatchToPageTranslator;
	private __arrPaginator = new ArrayPaginator(); // the Paginator that BatchToPageTranslator helps.
	
	private __currentPageNumber: number;


	constructor(
		private __dataSource: {

			dataTotal: number;

			getData: (batchNumber: number,  itemsPerBatch: number,  isLastBatch: boolean) => any[];
		}
	) {
		this.__bch2pgTranslator = new BatchToPageTranslator(this.__dataSource);

		this.itemsPerPage = 25;
	}


	set cacheItemLimit(value) {
		this.__bch2pgTranslator.itemsPerBatch = value;  // batchinator validates `value`.
	}


	set itemsPerPage(value) {
		this.__bch2pgTranslator.itemsPerPage = value;
		this.__arrPaginator.itemsPerPage = value;
	}


	get itemsPerPage(): number {
		return this.__bch2pgTranslator.itemsPerPage;
	}


	set currentPageNumber(value) {
		if (this.__bch2pgTranslator.currentBatchContainsPage(value)) {
			this.__setCurrentPageInCurrentBatch(value);
		} 
		else this.__loadBatchAndPage(value);

		this.__currentPageNumber = value;
	}


	get currentPage(): any[] {
		return this.__arrPaginator.currentPage; // contains all items in currently viewed page.
	}


	private __loadBatchAndPage(pageNumber) {
		this.__loadBatchContainingPage(pageNumber);
		this.__setCurrentPageInCurrentBatch(pageNumber);
	}


	private __loadBatchContainingPage(pageNumber) {
		this.__bch2pgTranslator.set_currentBatchNumber_basedOnPage(pageNumber);

		// The batch is fetched and given to the Paginator:
		this.__arrPaginator.data = this.__dataSource.getData(

			this.__bch2pgTranslator.currentBatchNumber,
			this.__bch2pgTranslator.itemsPerBatch,
			this.__bch2pgTranslator.currentBatchNumberIsLast
		);
	}


	private __setCurrentPageInCurrentBatch(pageNumber) {
		this.__arrPaginator.currentPageNumber =
			this.__bch2pgTranslator.getCurrentPageNumberForPaginator(pageNumber);
	}


}
```

## Inheritance Chain

BatchToPageTranslator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/batch-to-page-translator
```

## Loading

```ts
// If using TypeScript:
import { BatchToPageTranslator } from '@writetome51/batch-to-page-translator';
// If using ES5 JavaScript:
var BatchToPageTranslator = require('@writetome51/batch-to-page-translator').BatchToPageTranslator;
```   


## License
[MIT](https://choosealicense.com/licenses/mit/)
