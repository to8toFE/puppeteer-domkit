import { Domkit } from '@/typings/Domkit'
const $: Domkit = require('../index')

export default () => {
    it(`target(...)`, async () => {
        await $.expect.target('registry.npm.taobao.org')
    })

    it(`location`, async () => {
        await $.expect.location.hash('#/hash', { hashparam: '3' })
        await $.expect.location.pathname('/passkee')
        await $.expect.location.search({
            param: '1'
        })
    })
}
