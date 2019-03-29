import { Page, Browser } from 'puppeteer'
import './$Z'
import '$Selector'

declare var page: Page
declare var browser: Browser


export interface $ {
    (selector: string): $Selector

    constants: constants

    waitFor: $WaitFor
    expect: $Expect

    setBrowser(browser: any): Promise<void>
    setPage(page: any): Promise<void>
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

declare interface PlainObject {
    [key: string]: any
}

declare interface WaitForOptions {
    timeout: number
    delay: number
}
