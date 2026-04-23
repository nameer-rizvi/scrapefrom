# scrapefrom

Scrape data from any publicly accessible webpage.

## Installation

```bash
npm install scrapefrom
# or
yarn add scrapefrom
```

### Node v16 Support

```bash
npm install scrapefrom@2.5.6
# or
yarn add scrapefrom@2.5.6
```

## Usage

```javascript
const scrapefrom = require("scrapefrom"); // commonjs
// or
import scrapefrom from "scrapefrom"; // esm
```

### Scrape full page data

Returns the document `head` and `body` as JSON, a dot path `map` of all available properties, and an `extract` function for pulling values by path.

```javascript
await scrapefrom("https://example.com");
// { head: {...}, body: {...}, map: [...], extract: (path) => unknown }
```

### Extract elements by selector

```javascript
await scrapefrom({ url: "https://example.com", extract: "h1" });
// { h1: [...] }
```

### Extract with a custom name

```javascript
await scrapefrom({
  url: "https://example.com",
  extract: { name: "titles", selector: "h1" },
});
// { titles: [...] }
```

### Extract as a delimited string

```javascript
await scrapefrom({
  url: "https://example.com",
  extract: { name: "title", selector: "h1", delimiter: "," },
});
// { title: "...,..." }
```

### Extract an attribute value

```javascript
await scrapefrom({
  url: "https://example.com",
  extract: { name: "dates", selector: "time", attribute: "datetime" },
});
// { dates: [...] }
```

### Extract multiple selectors

```javascript
await scrapefrom({
  url: "https://example.com",
  extracts: [
    { name: "titles", selector: "h1" },
    { name: "dates", selector: "time", attribute: "datetime" },
  ],
});
// { titles: [...], dates: [...] }
```

### Extract from multiple URLs

```javascript
await scrapefrom(
  {
    url: "https://example.com",
    extracts: [{ name: "titles", selector: "h1" }],
  },
  {
    url: "https://example.org",
    extracts: [{ name: "titles", selector: "h1" }],
  },
);
// [{ titles: [...] }, { titles: [...] }]
```

### Extract structured row data

```javascript
await scrapefrom({
  url: "https://example.com",
  extract: {
    selector: "tbody tr",
    name: "rows",
    extracts: [
      { selector: "td:nth-child(1)", name: "key" },
      { selector: "td:nth-child(2)", name: "type" },
      { selector: "td:nth-child(3)", name: "definition" },
    ],
  },
});
// { rows: [{ key: "...", type: "...", definition: "..." }, ...] }
```

### Extract JSON-LD / application/json script tags

```javascript
await scrapefrom({
  url: "https://example.com",
  extract: { name: "schema", json: true },
});
// { schema: [...] }
```

### Use a custom extractor function

```javascript
await scrapefrom({
  url: "https://example.com",
  extractor: ($) => $("h1").text(),
});
```

### Extract values by dot path key map

```javascript
await scrapefrom({
  url: "https://example.com",
  parser: "json",
  keyPath: { title: "data.title", author: "data.author" },
});
// { title: "...", author: "..." }
```

## If a page requires JavaScript

By default `scrapefrom` uses `fetch` under the hood. If a page requires JavaScript to render, use `puppeteer` instead — it runs a headless Chrome browser to bypass this requirement.

First install puppeteer:

```bash
npm install puppeteer
# or
yarn add puppeteer
```

Then set `use: "puppeteer"` in your config:

```javascript
await scrapefrom({
  url: "https://example.com",
  use: "puppeteer",
  extracts: [{ name: "titles", selector: "h1" }],
});
```

## Config options

| Option                   | Type                     | Default   | Description                            |
| ------------------------ | ------------------------ | --------- | -------------------------------------- |
| `url`                    | `string \| URL`          |           | URL to scrape                          |
| `name`                   | `string`                 |           | Name assigned to config for logging    |
| `use`                    | `"fetch" \| "puppeteer"` | `"fetch"` | HTTP strategy to use                   |
| `log`                    | `boolean`                | `false`   | Enable request/response logging        |
| `timeout`                | `number`                 | `30000`   | Request timeout in milliseconds        |
| `fetch`                  | `RequestInit`            |           | Options passed to the `fetch` call     |
| `parser`                 | `"json" \| "text"`       | `"text"`  | Response parser                        |
| `launch`                 | `LaunchOptions`          |           | Puppeteer launch options               |
| `cookies`                | `CookieData[]`           |           | Cookies to set before the request      |
| `pageGoTo`               | `GoToOptions`            |           | Puppeteer page navigation options      |
| `waitForSelector`        | `string`                 |           | Selector to wait for before extracting |
| `waitForSelectorOptions` | `WaitForSelectorOptions` |           | Options for `waitForSelector`          |
| `select`                 | `string[]`               |           | Selector and values for `page.select`  |
| `selects`                | `string[][]`             |           | Multiple `page.select` calls           |
| `extractor`              | `(res) => unknown`       |           | Custom extractor function              |
| `extract`                | `ExtractConfig`          |           | Single extraction config               |
| `extracts`               | `ExtractConfig[]`        |           | Multiple extraction configs            |
| `keyPath`                | `Record<string, string>` |           | Dot path key map for JSON responses    |
| `delimiter`              | `string \| null`         |           | Delimiter for joining extracted arrays |
| `includeResponse`        | `boolean`                | `false`   | Include raw response in result         |
| `includeTimeout`         | `boolean`                | `false`   | Include timeout in result              |

## ExtractConfig options

| Option      | Type                          | Description                                     |
| ----------- | ----------------------------- | ----------------------------------------------- |
| `name`      | `string`                      | Key name in the result object                   |
| `delimiter` | `string \| null`              | Join extracted array with this delimiter        |
| `selector`  | `string`                      | CSS selector to query                           |
| `attribute` | `string`                      | Element attribute to extract instead of text    |
| `json`      | `boolean`                     | Extract JSON-LD or application/json script tags |
| `filter`    | `(res) => boolean`            | Filter function for JSON extraction results     |
| `keyPath`   | `Record<string, string>`      | Dot path key map for JSON extraction results    |
| `extract`   | `ExtractConfig`               | Nested extraction config                        |
| `extracts`  | `ExtractConfig[]`             | Multiple nested extraction configs              |
| `extractor` | `($, parentNode?) => unknown` | Custom extractor function                       |

## License

MIT
