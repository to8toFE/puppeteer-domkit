/**
 * 使用元素 offsetHeight 或 offsetTop 来判断元素是否可见
 */
module.exports = async function(selector) {
    if (!selector) throw 'selector is required'
    return await page.$eval(
        'body',
        (it, selector) => {
            const el = document.querySelector(selector)
            return el && (el.offsetHeight || el.offsetTop)
        },
        selector
    )
}
