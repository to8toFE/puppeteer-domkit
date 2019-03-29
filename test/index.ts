// const utils = require('@/utils')
import 'colors'
import puppeteer, { Page, Browser } from 'puppeteer'

import $ from '@/src'

import $spec from './$'
import $expect from './$.expect'
import $waitFor from './$.waitFor'
import $Selector from './$Selector'
import $SelectorExpect from './$Selector.expect'
import $SelectorWaitFor from './$Selector.waitFor'
let browser: Browser
let page: Page
describe('ppt$', () => {
    before(async () => {
        browser = await puppeteer.launch({
            headless: false
            //devtools: true
        })

        page = (await browser.pages())[0]

        await $.setBrowser(browser)

        await page.setViewport({
            width: 1366,
            height: 768
        })

        await page.setContent(`<html><body><div id="for-ppt-test"
                                    attr="for-ppt-test"
                                    data-data="for-ppt-test"
                                    class="for-ppt-test"
                                    style="display:block;height: 100px; width: 100px; position: fixed; top: 100px; left:100px;">
                                        for-ppt-test
                                </div></body></html>
                                `)
        await page.waitForSelector('#for-ppt-test')

        await page.waitFor(1000)
    })
    after(() => {
        browser.close()
    })
    describe('$', $spec)
    describe('$.expect', $expect)
    describe('$.waitFor', $waitFor)
    describe('$Selector', $Selector)
    describe('$Selector.expect', $SelectorExpect)
    describe('$Selector.waitFor', $SelectorWaitFor)
})
