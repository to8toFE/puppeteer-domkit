const path = require('path')
const utils = require('./utils')
const constants = require('./constants')
const VSelector = require('./VSelector')
const expects = require('./bom/expects')
const waitFors = require('./bom/waitFors')
const location = require('./bom/location')

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
Domkit.location = location

utils.defineFreezedProps(Domkit, { waitFor: waitFors, expect: expects })

Object.freeze(Domkit.waitFor)

module.exports = Domkit
