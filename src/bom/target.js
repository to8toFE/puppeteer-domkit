module.exports = {
    async findTarget(urlSubstr) {
        const targets = await browser.targets()
        return targets.find((it) => (it.url() || '').indexOf(urlSubstr) > -1)
    },
    async closeTarget(urlSubstr) {
        const target = await this.findTarget(urlSubstr)
        if (target) {
            await (await target.page()).close()
        } else {
            throw new Error(`canot find target:${urlSubstr}`)
        }
    }
}
