const path = require('path')

const click = require('./src/utils/click')
const clickFor = require('./src/utils/clickFor')
const blur = require('./src/utils/blur')
const input = require('./src/utils/input')

const exist = require('./src/utils/exist')
const visible = require('./src/utils/visible')

const findTarget = require('./src/utils/findTarget')
const closeTarget = require('./src/utils/closeTarget')

const constants = require('./src/constants')

browser = null
page = null
// 没参数
const props0 = [
    'text',
    'html',
    'height',
    'width',
    'offset',
    'offsetParent',
    'position',
    'val',
    'index',
    'scrollTop'
]
// 有参数
const props1 = ['css', 'attr', 'prop', 'data', 'is', 'hasClass']
// 选择器
const selectors = [
    'has',
    'not',
    'parents',
    'parent',
    'children',
    'siblings',
    'prev',
    'next',
    'find',
    'eq',
    'first',
    'last'
]

function Domkit(selector) {
    if (!selector) {
        throw new Error('[$Z] selector is required')
    }
    return new $Selector(selector)
}

/**
 * 常量
 */
Domkit.constants = constants

/**
 * 设置浏览器，默认将第一个启动的空白页面作为全局Page
 */
Domkit.setBrowser = async (b) => {
    browser = Domkit.browser = b

    Domkit.setCurrentPage((await browser.pages())[0])

    initPage()

    browser.on('targetcreated', (target) => {
        ;(async () => {
            console.log('targetcreated')
            initPage(await target.page())
        })()
    })
}

function initPage(p) {
    ;(p ? p : page).on('load', (response) => {
        page.addScriptTag({
            path: path.join(__dirname, './browser/$Z.js')
        })
    })
    ;(p ? p : page).on('console', (msg) => {
        const jsh = msg.args()
        for (let x of jsh) {
            const text = x.toString().replace(/JSHandle\:/g, '')
            if (text.indexOf('[test]') === 0) {
                console.log(` ${text.replace(/\[test\]/g, '')} `.bgYellow)
            }
        }
    })
}

/**
 * 设置需要被控制的页面
 */
Domkit.setCurrentPage = async (p) => {
    page = Domkit.page = p
}

Domkit.findTarget = findTarget
Domkit.closeTarget = closeTarget

const waitFors = {}

waitFors.target = async (targetUrlSubstr, options) => {
    await waitFor(
        async () => {
            return !!(await findTarget(targetUrlSubstr))
        },
        options,
        `waiting for target: ${targetUrlSubstr} but timeout (#)`
    )
}

waitFors.response = async (urlSubstr, options) => {
    await page.waitForResponse(
        (response) =>
            response.url().indexOf(urlSubstr) > -1 && response.status() === 200
    )
}

/**
 * 等待函数执行为true
 */
waitFors.fn = async (cb, options) => {
    await waitFor(
        async () => {
            return await cb()
        },
        options,
        `waiting for callback return true but timeout (#)`
    )
}

const expects = {}

expects.target = async (targetUrlSubstr, opened) => {
    const res = !!(await findTarget(targetUrlSubstr))
    if (
        (typeof opened !== 'undefined' && res !== opened) ||
        (typeof opened === 'undefined' && res)
    ) {
        throw new Error(
            `expect target: ${targetUrlSubstr} ${
                opened ? 'opened' : 'closed'
            } but false`
        )
    }
}

defineFreezedProps(Domkit, { waitFor: waitFors, expect: expects })

Object.freeze(Domkit.waitFor)

class $Selector {
    constructor(selector) {
        if (selector instanceof Array) {
            this.selectors = JSON.parse(JSON.stringify(selector))
        } else if (typeof selector === 'string' && selector) {
            this.selectors = [{ type: '$', params: [selector] }]
        } else if (!selector) {
            throw new Error('selector cannot be empty')
        }
        this.domSelector = ''
        const waitFors = {}
        const expects = {}

        props0.forEach((item) => {
            waitFors[item] = async (value, options) => {
                await waitFor(
                    async () => {
                        return equat(await Domkit(this.selectors)[item](), value)
                    },
                    options,
                    `waiting for ${converToString(
                        this.selectors
                    )}.${item}() to be '${value.toString()}' but timeout (#)`
                )
            }
        })

        props1.forEach((item) => {
            waitFors[item] = async (name, value, options) => {
                await waitFor(
                    async () => {
                        return equat(await Domkit(this.selectors)[item](name), value)
                    },
                    options,
                    `waiting for ${converToString(
                        this.selectors
                    )}.${item}(${name}) to be '${value.toString()}' but timeout (#)`
                )
            }
        })

        waitFors.visible = async (value, options) => {
            await waitFor(
                async () => {
                    return equat(await this.visible(), value)
                },
                options,
                `waiting for ${converToString(
                    this.selectors
                )}.visible() to be '${value.toString()}' but timeout (#)`
            )
        }

        waitFors.exist = async (value, options) => {
            await waitFor(
                async () => {
                    return equat(await this.exist(), value)
                },
                options,
                `waiting for ${converToString(
                    this.selectors
                )}.exist() to be '${value.toString()}' but timeout (#)`
            )
        }

        props0.forEach((item) => {
            expects[item] = async (value) => {
                if (!equat(await Domkit(this.selectors)[item](), value)) {
                    throw new ExpectError(
                        `expect ${converToString(
                            this.selectors
                        )}.${item}() to be '${value.toString()}' but false`
                    )
                }
            }
        })

        props1.forEach((item) => {
            expects[item] = async (name, value) => {
                if (!equat(await Domkit(this.selectors)[item](name), value)) {
                    throw new ExpectError(
                        `expect ${converToString(
                            this.selectors
                        )}.${item}(${name}) to be '${value.toString()}' but false`
                    )
                }
            }
        })

        expects.visible = async (value) => {
            if (!equat(await this.visible(), value)) {
                throw new ExpectError(
                    `expect ${converToString(
                        this.selectors
                    )}.visible(${name}) to be '${value.toString()}' but false`
                )
            }
        }

        expects.exist = async (value) => {
            if (!equat(await this.exist(), value)) {
                throw new ExpectError(
                    `expect ${converToString(
                        this.selectors
                    )}.exist(${name}) to be '${value.toString()}' but false`
                )
            }
        }

        defineFreezedProps(this, { expect: expects, waitFor: waitFors })
    }

    /**
     * 增强点击
     * @param {*} opts
     */
    async click(opts) {
        this.domSelector = await converToDomSelector(this.selectors)
        await clickFor(this.domSelector, opts)
        return this
    }

    async blur() {
        this.domSelector = await converToDomSelector(this.selectors)
        await blur(this.domSelector)
        return this
    }

    async focus() {
        this.domSelector = await converToDomSelector(this.selectors)
        await page.focus(this.domSelector)
        return this
    }

    async input(content, autoBlur) {
        this.domSelector = await converToDomSelector(this.selectors)
        await input(this.domSelector, content, autoBlur)
        return this
    }

    async type() {}
    async mouse() {}
    async hover() {}
    async tap() {}
    async press() {}
    async screenshot() {}
    async uploadFile() {}
}

// 选择器
selectors.forEach((item) => {
    $Selector.prototype[item] = function() {
        return new $Selector(
            assignSelectors(this.selectors, [
                { type: item, params: Array.prototype.slice.call(arguments) }
            ])
        )
    }
})

// 无参数
props0.forEach((it) => {
    $Selector.prototype[it] = async function() {
        return await page.$eval(
            'body',
            (el, selectors, method) => {
                return $Z.$select(selectors)[method]()
            },
            this.selectors,
            it
        )
    }
})

// 一个参数
props1.forEach((it) => {
    $Selector.prototype[it] = async function(param) {
        return await page.$eval(
            'body',
            (el, selectors, param, method) => {
                return $Z.$select(selectors)[method](param)
            },
            this.selectors,
            param,
            it
        )
    }
})

$Selector.prototype.visible = async function() {
    return await page.$eval(
        'body',
        (el, selectors) => {
            const elem = $Z.$select(selectors)[0]
            return elem && !!(elem.offsetHeight || elem.offsetTop)
        },
        this.selectors
    )
}

$Selector.prototype.exist = async function() {
    return await page.$eval(
        'body',
        (el, selectors) => {
            return !!$Z.$select(selectors).length
        },
        this.selectors
    )
}

module.exports = Domkit

function assignSelectors() {
    const $selector = []

    Array.prototype.slice.call(arguments).forEach((item) => {
        item &&
            item.forEach((itt) => {
                $selector.push({
                    type: itt.type,
                    params: itt.params
                })
            })
    })
    return $selector
}

function defineFreezedProps(context, obj) {
    for (const x in obj) {
        if (obj.hasOwnProperty(x)) {
            Object.defineProperty(context, x, {
                value: obj[x],
                configurable: false,
                writable: false,
                enumerable: false
            })
        }
    }
}

async function converToDomSelector(selectors) {
    const marks = await page.$eval(
        'body',
        (el, selectors) => {
            return $Z.getMarks($Z.$select(selectors))
        },
        selectors
    )
    return marks.map((item) => `[test-ppt-mark="${item}"]`).join(',')
}

async function converToString(selectors) {
    return selectors.map((item) => `${item.type}(${item.params})`).join('.')
}
async function waitFor(fotIt, opts, errorMsg) {
    opts = Object.assign({ timeout: 1000, delay: 100 }, opts)
    return await new Promise((r, rj) => {
        let time = opts.timeout

        ;(async () => {
            if (await fotIt()) {
                return r()
            } else {
                check()
            }
        })()

        function check() {
            setTimeout(async () => {
                time -= opts.delay
                if (!(await fotIt())) {
                    if (time > 0) {
                        check()
                    } else {
                        rj(
                            new TimeoutError(
                                errorMsg.replace(
                                    /\(\#\)/g,
                                    `(timeout: ${opts.timeout}, delay: ${
                                        opts.delay
                                    })`
                                )
                            )
                        )
                    }
                } else {
                    r()
                }
            }, opts.delay)
        }
    })
}

function equat(value, target) {
    if (typeof target === undefined) throw new Error('target is required')
    switch (target) {
        case constants.UNDEFINED:
            return typeof value === 'undefined'
        case constants.NULL:
            return value === null
        case constants.EMPTY:
            return (
                typeof value === 'undefined' && value === null && value === ''
            )
        case constants.NOT_EMPTY:
            return (
                typeof value !== 'undefined' && value !== null && value !== ''
            )
        default:
            return value === target
    }
}

class TimeoutError extends Error {
    constructor(message) {
        super(message)
        this.name = 'TimeoutError'
    }
}
class ExpectError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ExpectError'
    }
}
