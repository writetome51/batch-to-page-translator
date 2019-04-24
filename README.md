# Batchinator

A TypeScript/JavaScript class intended to help a separate Paginator class paginate data  
that can only be saved in-memory one batch at-a-time, where each batch is taken from a  
much bigger data set that can't be completely fetched all at once.   
A batch is defined as the total number of items the Paginator can handle at once.

An example: if the user is clicking thru pagination controls and clicks to page 10, it's  
this class' job to figure out which batch page 10 is in, tell the data-fetching tool what  
batch to fetch, and tell the Paginator what page to show.


## Properties
```
// The first 3 properties must be set before doing anything else:

totalItems: number;
    // number of items in entire data set.
    // This must be set first.

itemsPerPage: number;
    // This must be set second.

itemsPerBatch: number;

currentBatchNumber: number (read-only);
    // This is set by calling this.set_currentBatchNumber_basedOnPage(pageNumber) .

pagesPerBatch: number (read-only);

totalBatches: number (read-only);

totalPages: number (read-only);

className : string (read-only)
    // Not important.  Inherited from BaseClass.
```

## Methods
```
set_currentBatchNumber_basedOnPage(pageNumber): void
    // Figures out the batch number that contains pageNumber, and
    // assigns it to this.currentBatchNumber .

currentBatchContainsPage(pageNumber): boolean
    // Useful if you need to find out if the batch containing pageNumber 
    // is already the currently loaded batch.

getBatchNumberContainingPage(pageNumber): number

getCurrentPageNumberForPaginator(pageNumber): number
    // We assume the Paginator doesn't know it's handling batches of a larger data set, 
    // so this function translates the passed pageNumber into a different number, 
    // which it returns. This is the page number the Paginator needs to show.
    // Example:  say this.pagesPerBatch is 10. Say the user requests page 11. That page would be 
    // page 1 of batch 2.  You call this.set_currentBatchNumber_basedOnPage(11), fetch the 
    // batch, assign it to the Paginator, and call this.getCurrentPageNumberForPaginator(11). 
    // It will return 1. That's the page number Paginator must show.
```
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .
```	
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
export class PaginationDataController {

    constructor(
        private __batchinator: Batchinator,
        private __paginator: { data: any[], itemsPerPage: number, currentPageNumber: number },
        private __dataService: DataService // as of now, an imaginary interface
    ) { 
        // Set properties 'totalItems', 'itemsPerPage', and 'itemsPerBatch' before doing 
        // anything else with the batchinator:
        this.__batchinator.totalItems = this.__dataService.getTotalDataCount();
        this.__batchinator.itemsPerPage = this.__paginator.itemsPerPage;
        this.__batchinator.itemsPerBatch = 500;

        this.__loadBatchAndPage(1);
    }


    showPage(pageNumber) {
        if (this.__batchinator.currentBatchContainsPage(pageNumber)) {
            this.__showPageInCurrentBatch(pageNumber);
        }
        else this.__loadBatchAndPage(pageNumber);
    }


    private __showPageInCurrentBatch(pageNumber){
        this.__paginator.currentPageNumber = 
            this.__batchinator.getCurrentPageNumberForPaginator(pageNumber);
    }


    private __loadBatchAndPage(pageNumber){
        this.__loadBatchContainingPage(pageNumber);
        this.__showPageInCurrentBatch(pageNumber);
    }


    private __loadBatchContainingPage(pageNumber){
        this.__batchinator.set_currentBatchNumber_basedOnPage(pageNumber);

        this.__paginator.data = this.__dataService.getData(
            this.__batchinator.currentBatchNumber,
            this.__batchinator.itemsPerBatch
        );
    }


}
```

## Inheritance Chain

Batchinator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/batchinator
```

## Loading

```
// If using TypeScript:
import { Batchinator } from '@writetome51/batchinator';
// If using ES5 JavaScript:
var Batchinator = require('@writetome51/batchinator').Batchinator;
```   


## License
[MIT](https://choosealicense.com/licenses/mit/)
