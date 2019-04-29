# BatchCalculator

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

```

## Inheritance Chain

BatchCalculator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/batch-calculator
```

## Loading

```
// If using TypeScript:
import { BatchCalculator } from '@writetome51/batch-calculator';
// If using ES5 JavaScript:
var BatchCalculator = require('@writetome51/batch-calculator').BatchCalculator;
```   


## License
[MIT](https://choosealicense.com/licenses/mit/)
