# LoadToPageTranslator

A TypeScript/JavaScript class intended to help a separate Paginator class  
paginate data that can't all be stored in memory at once.  A load is the total  
amount of data the app can store in memory at once.

An example: if the user is clicking thru pagination controls and clicks to page 10,  
it's this class' job to figure out which load page 10 is in and tell the Paginator  
what page to show.

## Constructor
<details>
<summary>view constructor</summary>

```ts
constructor(
    __pageInfo: {
        getTotalPages: () => number;
    },
    __loadInfo: {
        getCurrentLoadNumber: () => number;
        getPagesPerLoad: () => number;
    }
)
```
</details>


## Methods
<details>
<summary>view methods</summary>

```ts
loadContainsPage(pageNumber, loadNumber): boolean

getLoadNumberOfPage(pageNumber): number

getPageNumberOfLoadFromAbsolutePage(pageNumber): number
    // Takes `pageNumber` and translates it into a page of the current load.
    // Example: say pagesPerLoad is 10, the current load is 2, and `pageNumber` 
    // is 11.  That would be page 1 of load 2, so the function returns 1.
```
</details>


## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm i @writetome51/load-to-page-translator
```

## Loading

```ts
// If using TypeScript:
import { LoadToPageTranslator } from '@writetome51/load-to-page-translator';
// If using ES5 JavaScript:
var LoadToPageTranslator = 
    require('@writetome51/load-to-page-translator').LoadToPageTranslator;
```   


## License
[MIT](https://choosealicense.com/licenses/mit/)
