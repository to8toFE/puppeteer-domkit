import { $Selector } from './$Selector'
import { Page, Browser } from 'puppeteer'

export interface Domkit {
    (selector: string): $Selector

    constants: constants

    waitFor: $WaitFor
    expect: $Expect

    page: Page
    browser: Browser

    setBrowser(browser: any): Promise<void>
    setCurrentPage(page: any): Promise<void>
}
interface $Expect {
    target(urlSubstr: string, opened?: boolean): Promise<void>
}

interface $WaitFor {
    target(urlSubstr: string, options?: WaitForOptions): Promise<void>
    response(urlSubstr: string, options?: WaitForOptions): Promise<void>
    fn(
        callback: () => Promise<boolean>,
        options?: WaitForOptions
    ): Promise<void>
}

declare interface constants {
    UNDEFINED: Symbol
    NULL: Symbol
    EMPTY: Symbol
    NOT_EMPTY: Symbol
}


interface WaitForOptions {
    timeout: number
    delay: number
}

