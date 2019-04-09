# puppeteer-domkit

### A toolkit for DOM operation with puppeteer in nodejs environment, make you write less and do more, which also improve test case development efficiency


## Why
------
I got tired of writing so many callbacks for DOM operations with api of puppeteer.

## Installation
----
```javascript
npm install puppeteer-domkit --save-dev
```

> This project contains typings files, just enjoy with TypeScript.


## Usage
------
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

> Except some event trigger and several methods, most of DOM operation are based on zeptojs, which would be injected when page on load.

[zepto.js Doc](https://zeptojs.com/)

What's different from `zepto.js` is that, `puppeteer-domkit` only supports getting data from dom but not setting data to dom or changing dom.

### The Methods return instance of VSelector 

`has`, `not`, `parents`, `parent`, `children`, `siblings`, `prev`, `next`, `find`, `eq`, `first`, `last`

> jQuery CSS extensions is supported, such as $('div:first') and el.is(':visible').

```javascript
const body: VSelector = $('body')
const header: VSelector = vselector.find('header')
const li1: VSelector = anotherSelector.find('li').eq(1)
const li2: VSelector = anotherSelector.find('li:eq(2)')
```

The instance of VSelector do nothing with document

### The Methods return Promise\<string | number | boolean | any\>

`text`, `html`, `height`, `width`, `offset`, `offsetParent`, `position`, `val`, `index`, `scrollTop`, `css`, `attr`, `prop`, `data`, `is`, `hasClass`

#### All above methods can be used for test cases under `waitFor` and `expect`

#### `VSelector.waitFor.X(name?, expectedValue?, options?:{timeout: 1000, delay: 100}):Promise<void>`

By default, it check the value to be the expected value every 100ms, it would throw `TimeoutError` if cannot get the expected value in 1000ms

```javascript

    await $('div.loading').waitFor.hasClass('hidden')

    await $('div.dialog').waitFor.css('display', 'block', {
        timeout: 3000,
        delay: 1000
    })

```

#### `VSelector.expect.X(name?, expectValue?):Promise<void>`

It checks the value immediately, and throw `ExpectError` if cannot get the expected value

```javascript

    await $('div.loading').expect.hasClass('hidden')

    await $('div.dialog').expect.css('display', 'block')

```


### Some helpful tool methods

`reload(options?: NavigationOptions): Promise<Response>`

`findTarget(targetUrlSubstr: string): Promise<Target>`

`closeTarget(targetUrlSubstr: string): Promise<Target>`

`blur(): Promise<void>`

`setBrowser(browser: Browser): Promise<void>`

`setCurrentPage(page: Page): Promise<void>`

`page: Page` // current page object

`browser: Browser` // current browser object

### Some Constants 

`UNDEFINED`, `NULL`, `EMPTY`, `NOT_EMPTY`

```javascript

await $('div.dialog').waitFor.attr('id', $.constants.NOT_EMPTY)
    
```

> 


License
-------

Licensed under MIT
