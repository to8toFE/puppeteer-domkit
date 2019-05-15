const path = require('path')
const utils = require('./utils')
const constants = require('./constants')
const VSelector = require('./VSelector')

browser = null
page = null

function Domkit(selector) {
    if (!selector) {
        throw new Error('[$Z] selector is required')
    }
    return new VSelector(selector)
}

Domkit.constants = constants
Domkit.browser = null
Domkit.setBrowser = async (b) => {
    browser = Domkit.browser = b

    await Domkit.setCurrentPage((await browser.pages())[0])

    initPage()

    browser.on('targetcreated', (target) => {
        ;(async () => {
            await initPage(await target.page())
        })()
    })
}

function initPage(p) {
    // TODO: 可能会比较慢，导致 $Z undifined，需要一个机制去告知用例执行时机
    ;(p ? p : page).on('console', (msg) => {
        const jsh = msg.args()
        for (let x of jsh) {
            const text = x.toString().replace(/JSHandle\:/g, '')
            if (text.indexOf('[test]') === 0) {
                console.log(` ${text.replace(/\[test\]/g, '')} `.bgYellow)
            }
        }
    })
    ;(p ? p : page).on('load', async (response) => {
        await page.addScriptTag({
            path: path.join(__dirname, '../browser/$Z.js')
        })
    })
}

Domkit.reload = async (opts) => {
    const res = await Domkit.page.reload(opts)
    await page.waitForFunction('window.$Z')
    return res
}

Domkit.page = null
Domkit.setCurrentPage = async (p) => {
    page = Domkit.page = p
}

Domkit.findTarget = utils.findTarget
Domkit.closeTarget = utils.closeTarget

const waitFors = {}

waitFors.target = async (targetUrlSubstr, options) => {
    await utils.waitFor(
        async () => {
            return !!(await utils.findTarget(targetUrlSubstr))
        },
        options,
        `waiting for target: ${targetUrlSubstr} but timeout (#)`
    )
}

// TODO: 需要加上精准的抛错提示
waitFors.response = async (urlSubstr, options) => {
    await page.waitForResponse(
        (response) =>
            response.url().indexOf(urlSubstr) > -1 && response.status() === 200
    )
}

waitFors.fn = async (cb, options) => {
    await utils.waitFor(
        async () => {
            return await cb()
        },
        options,
        `waiting for callback return true but timeout (#)`
    )
}

const expects = {}

expects.target = async (targetUrlSubstr, opened) => {
    const res = !!(await utils.findTarget(targetUrlSubstr))
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

utils.defineFreezedProps(Domkit, { waitFor: waitFors, expect: expects })

Object.freeze(Domkit.waitFor)

module.exports = Domkit
