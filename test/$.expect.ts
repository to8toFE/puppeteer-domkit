import { Domkit } from '@/typings/Domkit'
const $: Domkit = require('../index')

export default () => {
    it(`target(...)`, async () => {
        await $.expect.target('blank', true)
    })
}
