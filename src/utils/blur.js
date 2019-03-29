/***
 *  让元素失去焦点
 * */
module.exports = async () => {
    await page.mouse.click(blurOffset.x, blurOffset.y)
}
const blurOffset = { x: 10, y: 10 }

module.exports.offset = (offset) => {
    Object.assign(blurOffset, offset)
}
