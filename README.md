# scrapefrom

scrapefrom is a webscraper that can be used to get data from any publicly accessible html webpage.

## Installation

```
$ npm i scrapefrom
```

### Usage

Provide a config object or an array of config objects and handle the promise response data or error.

```javascript
const scrapefrom = require("scrapefrom");
// or,
// import scrapefrom from "scrapefrom"

const yahooFinanceConfig = {
  api: {
    url: "https://finance.yahoo.com/gainers",
  },
  selector: {
    container: `table[class="W(100%)"] tr`,
    text: {
      symbol: `a[class="Fw(600)"]`,
      company: `td[class="Va(m) Ta(start) Px(10px) Fz(s)"]`,
      change: `span[class="Trsdu(0.3s) Fw(600) C($dataGreen)"]`,
    },
  },
};

const capitalPrideConfig = {
  api: {
    url: "https://www.capitalpride.org/events-365/",
  },
  structured: {
    type: "Event",
    mapper: {
      type: "@type",
      title: "name",
      description: "description",
      date: "startDate",
      link: "url",
      price: "offers.price",
      img: "image",
    },
  },
};

scrapefrom([yahooFinanceConfig, capitalPrideConfig])
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
```

### Requirements

Required props include:

- object.api.url [string]
- object.selector.container [string]
- object.selector.text [object] AND/OR object.selector.attr [object]
  - object.selector.text:
    - `{ [name of value]: "selector string" }`
  - object.selector.attr:
    - `{ [name of value]: { selector: "string", attr: "string" } }`

**WARNING: the config object requirements are extremely rigid and opinionated, so much so that it might be best to take this sample config, with all of the available properties, and form a custom one based off of it (otherwise, expect lots of validation messages!):**

```javascript
const config = {
  api: {
    url: "",
    params: {
      name: "",
      name2: "",
    },
  },
  selector: {
    container: "",
    text: {
      name: "",
      name2: "",
    },
    attr: {
      name: {
        selector: "",
        attr: "",
      },
      name2: {
        selector: "",
        attr: "",
      },
    },
  },
};
```

[Folder containing some sample configs for google news, twitter, yahoo finance and capital pride (for structured data).](https://github.com/nameer-rizvi/scrapefrom/tree/master/src/samples)

**NOTE: the scraper works best on webpages that render all of the html on page load (server side rendered). A good way to check if a webpage does this is is by [opening your browsers dev tools and disabling javascript](https://developers.google.com/web/tools/chrome-devtools/javascript/disable) before manually loading the webpage.**
