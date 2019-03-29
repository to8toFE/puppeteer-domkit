const visible = require('./visible')
const exist = require('./exist')
const findTarget = require('./findTarget')

const fors = ['until', 'forShow', 'forHidden', 'forDispose', 'forTarget']

/**
 * 连续、精确点击，直到满足一定条件才停止
 * 触发自动连续点击的条件：存在 until forShow forHidden forDispose forTarget 其中一个参数
 * 否则只会触发点击一次
 * @param {*} selector
 * @param {*} opts {
 *  x: 10,   元素点击位置左上角横向偏移
 *  y: 10,   元素点击位置左上角横向偏移
 *  until: ()=> true,
 *  timeout: 10000,   连续点击
 *  timespan: 1000,   连续点击时间间隔
 *  delay: 100,  点击后延迟判断，并非延迟点击
 *  [forShow forHidden forDispose forExist forTarget]: selector
 *  closeTarget: true
 * }
 */
module.exports = async (selector, opts = {}) => {
    opts = Object.assign(
        {
            timeout: 10000,
            timespan: 1000,
            delay: 0,
            x: 10,
            y: 10
        },
        opts
    )
    await page.waitForSelector(selector)
    const startTime = Date.now()
    await clck()
    async function clck() {
        const el = await page.$(selector)
        // 聚焦被点击元素，否则界面视图位置可能不正确，导致各种问题
        el.focus()
        const box = await el.boundingBox()

        if (!el || !box) {
            if (!opts.forDispose && !opts.forHidden) {
                throw 'element not visible or deleted fro document'
            } else {
                return
            }
        }

        await page.mouse.click(box.x + (opts.x || 10), box.y + (opts.y || 10))
        if (opts.delay) {
            await page.waitFor(opts.delay)
        }
        if (fors.some((it) => !!opts[it])) {
            if (Date.now() - startTime < opts.timeout) {
                if (opts.until) {
                    if (!(await opts.until())) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    }
                } else if (opts.forShow) {
                    if (!(await visible(opts.forShow))) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    }
                } else if (opts.forHidden) {
                    if (await visible(opts.forHidden)) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    }
                } else if (opts.forDispose) {
                    if (await exist(opts.forDispose)) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    }
                } else if (opts.forExist) {
                    if (!(await exist(opts.forExist))) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    }
                } else if (opts.forTarget) {
                    const target = await findTarget(opts.forTarget)
                    if (!target) {
                        await page.waitFor(opts.timespan)
                        await clck()
                    } else if (opts.closeTarget) {
                        await (await target.page()).close()
                    }
                }
            } else {
                throw 'click timeout, as allways not ok'
            }
        }
    }
}
