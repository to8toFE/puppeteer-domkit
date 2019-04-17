import { Domkit } from '@/typings/Domkit'
const $: Domkit = require('../index')

export default () => {
    it('$(selector)', async () => {
        const el = $('body')
        if (!el.waitFor) {
            throw 'err'
        }
    })
    it(`$('') error`, async () => {
        return new Promise((r, rj) => {
            try {
                $('')
                rj('error')
            } catch (e) {
                r(e.toString())
            }
        })
    })
}
