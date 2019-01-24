# Batchinator

A TypeScript/JavaScript class for paginating data batches that can only be saved  
in-memory one batch at-a-time, where each batch is taken from a much bigger data  
set that can't be completely fetched all at once.  
A single batch is measured by the number of pages it has.  
If the user is clicking thru pagination controls and clicks to page 10, for instance,  
it's this class' job to figure out which batch page 10 is in and tell this.paginator  
what page to currently be showing.
It's not this class' responsibility to actually fetch the data from a db,
or assign the current batch to this.paginator.data.

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/batch-paginator
```

## Loading

```
// If using TypeScript:
import { BatchPaginator } from '@writetome51/batch-paginator';
// If using ES5 JavaScript:
var BatchPaginator = require('@writetome51/batch-paginator').BatchPaginator;
```   

## Constructor

```
constructor(public paginator: AppPaginator)
```

## Properties
```
data : any[] (read-writable) //  the array being paginated.

itemsPerPage : integer  (read-writable)
    // default is 25.

currentPageNumber : integer (read-writable)
    // Assigning this a value automatically causes this.currentPage to update.

currentPage : any[] (read-only)
    // all items to be shown on current page.

totalPages : integer (read-only)

protected  _currentPageNumber : integer (read-writable)
    // available in case a subclass wants to use it.

className : string (read-only)
```

## Methods
```
getPage(pageIndex) : any[]
    // returns a 'page' of items copied from this.data.
    // You may not need to use this method because you can
    // simply get the value of this.currentPage instead.
    

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

## Usage

```
// Getting an instance:
let paginator = new BatchPaginator(theData, itemsPerPage); 

// Assigning it a new array:  
paginator.data = [item1, item2, item3, ...]

// Changing number of items per page:  
paginator.itemsPerPage = 15;

// Getting a page:
let page = paginator.getPage(pageIndex);  // page indexes begin at 0.

// Changing the current page, and then reading it:
paginator.currentPageNumber += 1;
let currentPage = paginator.currentPage; 

// Getting the total number of pages:  
let totalPages = paginator.totalPages;

// Getting the current page number:  
let currentPageNumber = paginator.currentPageNumber;
```

## Inheritance Chain

BatchPaginator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## License
[MIT](https://choosealicense.com/licenses/mit/)