module.exports = async (url) => {
    const targets = await browser.targets()
    return targets.find((it) => (it.url() || '').indexOf(url) > -1)
}
