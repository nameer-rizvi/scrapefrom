# scrapefrom

scrapefrom is a webscraper that can be used to fetch data from any URL.

## installation

```
$ npm i scrapefrom
```

## import

```javascript
const scrapefrom = require("scrapefrom");
// or,
// import scrapefrom from "scrapefrom"
```

## use cases

Extract html_raw_full, html_raw_split, html_stripped_full, html_stripped_split.

```javascript
scrapefrom("https://www.npmjs.com/package/scrapefrom").then(console.log);
```

Extract an array of strings for all h1 tags on a page.

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: "h1",
  defaultDelimiter: null,
}).then(console.log); // "{ h1: [...] }"
```

Extract an array of strings for all h1 tags on a page as "titles".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: { name: "titles", selector: "h1", delimiter: null },
}).then(console.log); // "{ titles: [...] }"
```

Extract a joined array of strings for all h1 tags on a page using a delimiter, as "title".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: { name: "title", selector: "h1", delimiter: "--" },
}).then(console.log); // "{ title: "...--..." }"
```

Extract an array of datetime attribute values for all time tags on a page as "dates".

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  extract: {
    name: "dates",
    selector: "time",
    attribute: "datetime",
    delimiter: null,
  },
}).then(console.log); // "{ dates: [...] }"
```

Extract previous use cases in a single config.

```javascript
scrapefrom({
  url: "https://www.npmjs.com/package/scrapefrom",
  defaultDelimiter: null,
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
    defaultDelimiter: null,
    extracts: [
      { name: "titles", selector: "h1" },
      { name: "dates", selector: "time", attribute: "datetime" },
    ],
  },
  {
    url: "https://www.npmjs.com/package/async-fetch",
    defaultDelimiter: null,
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

Extract json from a page using a json filter and a keyMap.

```javascript
scrapefrom({
  url: "https://dcmusic.live/",
  extracts: [
    {
      json: true,
      name: "organization_logos",
      filter: (json) => json["@type"] === "Organization",
      keyMap: { site_logo: "logo" },
    },
  ],
}).then(console.log); // { organization_logos: [ { site_logo: '...' } ] }
```

Extract json from an api using a keyMap.

```javascript
scrapefrom({
  url: "https://api.dcmusic.live/app/initialize",
  keyMap: { silver_metroline_color: "metrolines.1.color" },
}).then(console.log); // { silver_metroline_color: 'blue-600' }
```

Extract json from an api using a custom extractor.

```javascript
scrapefrom({
  url: "https://api.dcmusic.live/app/initialize",
  extractor: (json) => ({ silver_metroline_color: json.metrolines[1].color }),
}).then(console.log); // { silver_metroline_color: 'blue-600' }
```

## If a page requires javascript...

By default scrapefrom utilizes [node-fetch](https://www.npmjs.com/package/node-fetch) under the hood, but if a page is unavailable because it requires javascript, there is the option to use [puppeteer](https://www.npmjs.com/package/puppeteer) (which should be able to bypass this requirement through the use of a headless chrome browser).
