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
        await  el.focus()
        const box = await el.boundingBox()

        if (!el || !box) {
            if (!opts.forDispose && !opts.forHidden) {
                throw new Error('element not visible or deleted fro document')
            } else {
                return
            }
        }

        await page.mouse.click(box.x + (opts.x || 10), box.y + (opts.y || 10))
    }
}
