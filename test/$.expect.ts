const $: $ = require('@/src')

export default () => {
    it(`target(...)`, async () => {
        await $.expect.target('blank', true)
    })
}
