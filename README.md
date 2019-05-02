# puppeteer-domkit

### A toolkit for DOM operation with puppeteer in nodejs environment, which greatly improves test case development efficiency

## Why

I got tired of writing so many callbacks for DOM operations with puppeteer api.

## Installation

```javascript
npm install puppeteer-domkit --save-dev
```

> This project already contains typings files, just enjoy programing with TypeScript

## Usage

```javascript
import puppeteer from 'puppeteer'
import $ from 'puppeteer-domkit'

(async ()=>{
    let browser = await puppeteer.launch()

    // puppeteer-domkit would init with browser and set the default page to be the current page.
    await $.setBrowser(await browser.pages())

    const $body = $('body')

    if(await $body.hasClass('some-class')){
        const id = await $body.find('.item:eq(0)').attr('id')
    }

    ...
})();
```

> Except some event trigger and some methods, most of DOM api are based on zeptojs, which would be injected when page on load.

[zepto.js Doc](https://zeptojs.com/)

What's different from `zepto.js` is that, `puppeteer-domkit` only supports getting data from dom but not setting data to dom or changing dom.

In chromium page, it was modified for `puppeteer-domkit` and exposes `$Z` namespace.

## Methods return instance of VSelector

`has`, `not`, `parents`, `parent`, `children`, `siblings`, `prev`, `next`, `find`, `eq`, `first`, `last`

> jQuery CSS extensions is supported, such as \$('div:first') and el.is(':visible').

```javascript
const body: VSelector = $('body')
const header: VSelector = body.find('header')
const li1: VSelector = header.find('li').eq(1)
const ul: VSelector = li1.parents('ul:visible')
```

The instance of VSelector do nothing with document

## Methods return Promise\<string | number | boolean | any\>

`text`, `html`, `height`, `width`, `offset`, `offsetParent`, `position`, `val`, `index`, `scrollTop`, `css`, `attr`, `prop`, `data`, `is`, `hasClass`

### All above methods can be used for test cases under `waitFor` and `expect`

### `VSelector.waitFor.X(name?, expectedValue?, options?:{timeout: 1000, delay: 100}):Promise<void>`

By default, it checks to be the expected value every 100ms and it would throw `TimeoutError` if failed to get the expected value after 1000ms

```javascript
await $('div.loading').waitFor.hasClass('hidden')
await $('div.dialog').waitFor.css('display', 'block', {
    timeout: 3000,
    delay: 1000
})
```

### `VSelector.expect.X(name?, expectValue?):Promise<void>`

It checks the value immediately, and throw `ExpectError` if failed to get the expected value

```javascript
await $('div.loading').expect.hasClass('hidden')
await $('div.dialog').expect.css('display', 'block')
```

## Event Triggers

All event triggers are based on api of puppeteer and do some functional packaging

### `VSelector.click(options?): Promise<void>`

Enhanced click function, supports continuous click for some expected result.

#### options

```javascript
{
    x: 10,   // click on element offset left
    y: 10,   // click on element offset top

    forShow?: string | forHidden?: string | forDispose?: string | forExist?: string | forTarget?: string | until?: () => true // checking options, selector or sub string of url or function
    // should not be more than one of checking options

    // the below options could work, only if had one of above checking options
    timeout: 10000, // timeout
    timespan: 1000, // time span between two click
    delay: 100,  // delay of checking expected result after click
    closeTarget: true  // work with forTarget, close target when the target is open
}
```

### `VSelector.input(content: string, autoBlur: boolean = true): Promise<void>`

1. clear the old value of element
2. type the new value to the element
3. blur the element by default

### `VSelector.type(content: string): Promise<void>`

VSelector.type == Puppeteer.Page.type

### `VSelector.focus(): Promise<void>`

VSelector.focus == Puppeteer.Page.focus

### Some helpful tool methods

`reload(options?: NavigationOptions): Promise<Response>`

`findTarget(targetUrlSubstr: string): Promise<Target>`

`closeTarget(targetUrlSubstr: string): Promise<Target>`

`blur(): Promise<void>`

`setBrowser(browser: Browser): Promise<void>`

`setCurrentPage(page: Page): Promise<void>`

`page: Page` // current page object

`browser: Browser` // current browser object

### Constants

`UNDEFINED`, `NULL`, `EMPTY`, `NOT_EMPTY`

```javascript
await $('div.dialog').waitFor.attr('id', $.constants.NOT_EMPTY)
```

---

---

## `puppeteer-domkit` is being revised and updated periodically

## Welcome to be a contributor to this project

---

---

## License

Licensed under MIT
