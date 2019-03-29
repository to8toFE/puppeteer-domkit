const findTarget = require('./findTarget')

module.exports = async (url) => {
    const target = await findTarget(url)
    if (target) {
        await (await target.page()).close()
    } else {
        throw new Error(`canot find target:${url}`)
    }
}
