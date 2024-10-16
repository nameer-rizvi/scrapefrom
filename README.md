# scrapefrom

Scrape data from any webpage.

## installation

```console
npm i scrapefrom
```

### node v16 support

```console
npm i scrapefrom@2.5.6
```

## import

```javascript
const scrapefrom = require("scrapefrom");
// or,
// import scrapefrom from "scrapefrom"
```

## use cases

Extract document head and document body in json format as well as a key map of all available properties in dot notation.

```javascript
scrapefrom("https://www.npmjs.com/package/scrapefrom").then(console.log);
```

Extract an array of h1 tags on a page.

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: "h1",
}).then(console.log); // "{ h1: [...] }"
```

Extract an array of h1 tags on a page as "titles".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: { name: "titles", selector: "h1" },
}).then(console.log); // "{ titles: [...] }"
```

Extract a commafied list of h1 tags on a page as "titles".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: { name: "title", selector: "h1", delimiter: "," },
}).then(console.log); // "{ title: "...,..." }"
```

Extract an array of datetime attributes for all time tags on a page as "dates".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: {
    name: "dates",
    selector: "time",
    attribute: "datetime",
  },
}).then(console.log); // "{ dates: [...] }"
```

Extract previous use cases in a single response.

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extracts: [
    { name: "titles", selector: "h1" },
    { name: "dates", selector: "time", attribute: "datetime" },
  ],
}).then(console.log); // "{ titles: [...], dates: [...] }"
```

Extract previous use cases from multiple URLs.

```javascript
scrapefrom([
  {
    url: "https://www.npmjs.com/package/scrapefrom",
    extracts: [
      { name: "titles", selector: "h1" },
      { name: "dates", selector: "time", attribute: "datetime" },
    ],
  },
  {
    url: "https://www.npmjs.com/package/async-fetch",
    extracts: [
      { name: "titles", selector: "h1" },
      { name: "dates", selector: "time", attribute: "datetime" },
    ],
  },
]).then(console.log); // "[{ titles: [...], dates: [...] }, { titles: [...], dates: [...] }]"
```

Extract a list of items from a page.

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/async-fetch",
  delimiter: "",
  extract: {
    selector: "tbody tr",
    name: "rows",
    extracts: [
      { selector: "td:nth-child(1)", name: "key" },
      { selector: "td:nth-child(2)", name: "type" },
      { selector: "td:nth-child(3)", name: "definition" },
      { selector: "td:nth-child(4)", name: "default" },
    ],
  },
}).then(console.log); // "[ { key: "...", type: "...", definition: "...", default: "..." }, ...]"
```

## if a page requires javascript...

By default scrapefrom utilizes fetch under the hood, but if a page is unavailable because it requires javascript, there is the option to use [puppeteer](https://www.npmjs.com/package/puppeteer) (which should be able to bypass this requirement through the use of a headless chrome browser).
