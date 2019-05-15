export declare class VSelector {
    waitFor: DomWaitFor
    expect: DomExpect
    input(content: string, autoBlur?: boolean): Promise<void>
    type(content: string): Promise<void>
    click(options?: clickForOptions): Promise<void>
    focus(): Promise<void>
    blur(offsetY?: number): Promise<void>

    text(): Promise<string>
    html(): Promise<string>
    height(): Promise<number>
    width(): Promise<number>
    val(): Promise<string>
    index(): Promise<number>
    offset(): Promise<{
        top: number
        left: number
        width: number
        heigh: number
    }>
    offsetParent(): Promise<{
        top: number
        left: number
        width: number
        heigh: number
    }>
    position(): Promise<{ top: number; left: number }>
    scrollTop(): Promise<number>

    visible(): Promise<boolean>
    exist(): Promise<boolean>
    length(): Promise<number>

    css(name: string): Promise<string>
    attr(attrname: string): Promise<any>
    prop(name: string): Promise<any>
    data(name: string): Promise<any>
    is(selector: string): Promise<boolean>
    hasClass(name: string): Promise<boolean>

    has(selector?: string): VSelector
    not(selector?: string): VSelector
    parents(selector?: string): VSelector
    parent(selector?: string): VSelector
    children(selector?: string): VSelector
    siblings(selector?: string): VSelector
    prev(selector?: string): VSelector
    next(selector?: string): VSelector
    find(selector: string): VSelector
    eq(index: number): VSelector

    first(): VSelector
    last(): VSelector
}

// offsetLeft offsetTop
interface DomWaitFor {
    text(value: string | Symbol, options?: WaitForOptions): Promise<void>
    html(value: string | Symbol, options?: WaitForOptions): Promise<void>
    height(value: string | Symbol, options?: WaitForOptions): Promise<void>
    width(value: number | Symbol, options?: WaitForOptions): Promise<void>
    val(value: string | Symbol, options?: WaitForOptions): Promise<void>
    index(value: number | Symbol, options?: WaitForOptions): Promise<void>

    visible(value: boolean, options?: WaitForOptions): Promise<void>
    exist(value: boolean, options?: WaitForOptions): Promise<void>
    length(value: number, options?: WaitForOptions): Promise<void>

    scrollTop(value: number | Symbol, options?: WaitForOptions): Promise<void>

    css(
        name: string | Symbol,
        value: string,
        options?: WaitForOptions
    ): Promise<void>
    attr(
        name: string | Symbol,
        value: string,
        options?: WaitForOptions
    ): Promise<void>
    prop(
        name: string | Symbol,
        value: string,
        options?: WaitForOptions
    ): Promise<void>
    data(
        name: string | Symbol,
        value: string,
        options?: WaitForOptions
    ): Promise<void>
    is(
        selector: string,
        value: boolean,
        options?: WaitForOptions
    ): Promise<void>

    hasClass(name: string, value: boolean): Promise<void>
}
interface DomExpect {
    text(value: string | Symbol): Promise<void>
    html(value: string | Symbol): Promise<void>
    height(value: string | Symbol): Promise<void>
    width(value: number | Symbol): Promise<void>
    val(value: string | Symbol): Promise<void>
    index(value: number | Symbol): Promise<void>

    visible(value: boolean): Promise<void>
    exist(value: boolean): Promise<void>
    length(value: number): Promise<void>

    scrollTop(value: number | Symbol): Promise<void>

    css(name: string | Symbol, value: string): Promise<void>
    attr(name: string | Symbol, value: string): Promise<void>
    prop(name: string | Symbol, value: string): Promise<void>
    data(name: string | Symbol, value: string): Promise<void>
    is(selector: string | Symbol, value: boolean): Promise<void>

    hasClass(name: string | Symbol, value: boolean): Promise<void>
}

interface clickForOptions {
    timeout?: number
    timespan?: number
    delay?: number
    x?: number
    y?: number
    until?: Function
    forShow?: string
    forHidden?: string
    forDispose?: string
    forTarget?: string
    closeTarget?: boolean
}

export declare interface PlainObject {
    [key: string]: any
}

export declare interface WaitForOptions {
    timeout?: number
    delay?: number
}

export default VSelector
