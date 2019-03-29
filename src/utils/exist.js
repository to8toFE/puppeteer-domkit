/**
 * 判断元素是否存在
 */
module.exports = async (selector) => {
    if (!selector) throw 'selector is required'
    return await page.$eval(
        'body',
        (it, selector) => {
            return !!document.querySelector(selector)
        },
        selector
    )
}
