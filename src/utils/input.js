const blur = require('./blur')
/**
 * 用type的方式，设置input的指定value值，支持输入完毕后 blur
 */
module.exports = async (selector, content, autoBlur = true) => {
    await page.waitForSelector(selector)
    await page.focus(selector)
    await page.$eval(selector, (el) => {
        el.value = ''
        return true
    })
    if (content) {
        await page.type(selector, content, { delay: 10 })
    }
    if (autoBlur) {
        await blur()
    }
}
