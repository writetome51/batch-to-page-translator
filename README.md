# BatchToPageTranslator

A TypeScript/JavaScript class intended to help a separate Paginator class paginate  
data that can only be stored in memory one batch at-a-time, because each batch is  
taken from a much bigger data set that can't be completely fetched all at once.   
A batch is defined as the amount of data the Paginator can handle at once.

An example: if the user is clicking thru pagination controls and clicks to page 10,  
it's this class' job to figure out which batch page 10 is in and tell the Paginator  
what page to show.

## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    pageInfo: {
        totalPages: number;
    },
    
    batchInfo: {
        currentBatchNumber: number;
        pagesPerBatch: number;
    }
)
```
</details>


## Properties
<details>
<summary>view properties</summary>

```ts
className : string (read-only)
    // Not important.  Inherited from BaseClass.
```
</details>

## Methods
<details>
<summary>view methods</summary>

```ts
set_currentBatchNumber_toBatchContainingPage(pageNumber): void
    // Figures out the batch number that contains pageNumber, and
    // assigns it to `batchInfo.currentBatchNumber` (from the constructor).

currentBatchContainsPage(pageNumber): boolean
    // Useful if you need to find out if the batch containing pageNumber 
    // is already `batchInfo.currentBatchNumber`.

getBatchNumberContainingPage(pageNumber): number

getPageNumberInCurrentBatchFromAbsolutePage(pageNumber): number
    // Takes pageNumber and translates it into a page of the current batch.
    // Example: say `batchInfo.pagesPerBatch` is 10, `batchInfo.currentBatchNumber` 
    // is 2, and passed `pageNumber` is 11. That would be page 1 of the current 
    // batch, so the function returns 1.
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


protected   _errorIfPropertyHasNoValue(
                property: string, // can contain dot-notation, i.e., 'property.subproperty'
                propertyNameInError? = ''
            ) : void
    // If value of this[property] is undefined or null, it triggers fatal error:
    // `The property "${propertyNameInError}" has no value.`
```
</details>

## Usage Example

```

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
