# scrapefrom

scrapefrom is a basic webscraper that can be used to get data from any publicly accessible html webpage.

It currently supports three main methods, all of which are promise-based functions: .googleNews(), .twitter() and .custom().

## Get Started

To install scrapefrom run:

```javascript
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
  - "A cool search term that interests you"
  - "Several, search terms, That May, interest you"
- Or, an array of strings:
  - ["An array with a single interesting search term"]
  - ["An array", "With Several", "dope search terms"]

### Response data

For .googleNews() the function will return an array of objects for each search term, with each object containing an article's headline, short, source, time, and link.

For .twitter() the function will return an array of objects for each search term, with each object containing a tweets content, user handle, time, and link.

_If there's no matching results for a search term, the function will return an empty array for that search term._

## .custom()

This method takes in a custom config object and returns data in the same way .googleNews() or .twitter() might.

WARNING: the config object requirements are extremely rigid and opinionated, so much so that it might be best to take the config for .twitter() and form a custom one straight from it:

```javascript
module.exports = {
  api: {
    url: "https://mobile.twitter.com/search?",
    params: {
      q: `Search term!! lang:en`
    }
  },
  selector: {
    container: "table.tweet",
    text: {
      tweet: "div.tweet-text",
      user: "div.username",
      time: "td.timestamp a"
    },
    attr: {
      link: {
        selector: "span.metadata a",
        attr: "href"
      }
    }
  }
};
```
