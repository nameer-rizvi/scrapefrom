# scrapefrom

scrapefrom is a basic webscraper that can be used to get data from any publicly accessible html webpage.

It currently supports three methods, all of which are promise-based functions:

- .googleNews()
- .twitter()
- .custom().

## Get Started

To install scrapefrom run:

```
$ npm i scrapefrom
```

## .googleNews() & .twitter()

Supply a search term or a collection of search terms and handle the response or error in a .then() or .catch() function.

For example:

```javascript
const scrapefrom = require("scrapefrom");
// or,
// import scrapefrom from "scrapefrom"

scrapefrom
  .twitter("some trendy topic")
  .then(data => console.log(data))
  .catch(err => console.log(err));
```

### Search term(s)

Both methods accept one param:

- A string (can be comma separated):

```javascript
scrapefrom.googleNews("A cool search term that interests you");
```

```javascript
scrapefrom.googleNews("Several, search terms, That May, interest you");
```

- Or, an array of strings:

```javascript
scrapefrom.googleNews(["An array with a single interesting search term"]);
```

```javascript
scrapefrom.googleNews(["An array", "With Several", "dope search terms"]);
```

### Response data

For .googleNews() the function will return an array of objects for each search term, with each object containing an article's:

- headline
- short
- source
- time
- link

For .twitter() the function will return an array of objects for each search term, with each object containing a tweet's:

- content
- user handle
- time
- link

_If there are no matching results for a search term, the function will return an empty array for that search term._

## .custom()

This method takes in a custom config object and returns data in the same way .googleNews() or .twitter() might.

Required props include:

- object.api.url [string]
- object.selector.container [string]
- object.selector.text OR object.selector.attr
  - object.selector.text: `{ [name of value]: "selector string" }`
  - object.selector.attr: `{ [name of value]: { selector: "string", attr: "string" } }`

**WARNING: the config object requirements are extremely rigid and opinionated, so much so that it might be best to take this sample config with all of the available properties and form a custom one based off it (otherwise, expect lots of validation messages!):**

```javascript
const config = {
  api: {
    url: "",
    params: {
      q: ""
    }
  },
  selector: {
    container: "",
    text: {
      name: "",
      name2: ""
    },
    attr: {
      name: {
        selector: "",
        attr: ""
      },
      name2: {
        selector: "",
        attr: ""
      }
    }
  }
};
```

**NOTE: the scraper works best on webpages that render all of the html on page load (aka. server side rendering). A good way to check if a webpage does this is by opening your browsers dev tools, disabling javascript and refreshing the page. See how to do this on Chrome: https://developers.google.com/web/tools/chrome-devtools/javascript/disable.**
