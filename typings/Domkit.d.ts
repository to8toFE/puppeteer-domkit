import { VSelector } from './VSelector'
import { Page, Browser, Target, NavigationOptions ,Response} from 'puppeteer'

export interface Domkit {
    (selector: string): VSelector

    constants: constants

    waitFor: $WaitFor
    expect: $Expect

    reload(options?: NavigationOptions): Promise<Response>

    findTarget(targetUrlSubstr: string): Promise<Target>
    closeTarget(targetUrlSubstr: string): Promise<Target>
    blur(): Promise<void>

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
    timeout?: number
    delay?: number
}

