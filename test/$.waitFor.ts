import { Domkit } from '@/typings/Domkit'
const $: Domkit = require('../index')
declare var $Z
export default () => {
    it(`target(...)`, async () => {
        await $.waitFor.target('registry.npm.taobao.org')
    })
    it(`response(...)`, async () => {
        $.page.evaluate(() => {
            $Z('body').append(
                '<img src="https://img.to8to.com/to8to_pc/xiaoguotu/tumax/banner3.png?v=20181120" alt="">'
            )
        })
        await $.waitFor.response('/to8to_pc/xiaoguotu/tumax/banner3.png')
    })
    it(`fn(...)`, async () => {
        await $.waitFor.fn(async () => {
            return true
        })
    })
    it(`$.waitFor.request`, async () => {
        $.page.evaluate(() => {
            $Z.ajax({
                url: '/aaa?v=2',
                data: {
                    a: 1
                },
                type: 'post'
            })
        })
        await $.waitFor.request('/aaa', { a: '1' })
    })
    it(`$.waitFor.delay`, async () => {
        const t1 = Date.now()
        await $.waitFor.delay(1000)
        if (Date.now() - t1 < 1000) {
            throw `${Date.now() - t1}`
        }
    })

    // https://registry.npm.taobao.org/passkee?param=1#/hash?hashparam=3
    it.only(`$.waitFor.location`, async () => {
        await $.waitFor.location.hash('#/hash', { hashparam: '3' })
        await $.waitFor.location.pathname('/passkee')
        await $.waitFor.location.search({
            param: '1'
        })
    })
}
