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
</details>


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
var BatchToPageTranslator = 
    require('@writetome51/batch-to-page-translator').BatchToPageTranslator;
```   


## License
[MIT](https://choosealicense.com/licenses/mit/)
