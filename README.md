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
constructor(
    private __paginator: { currentPageNumber: number, itemsPerPage: number }
) 
```

## Properties
```
className : string (read-only)
```

## Methods
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

## Usage

```

```

## Inheritance Chain

Batchinator<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## License
[MIT](https://choosealicense.com/licenses/mit/)