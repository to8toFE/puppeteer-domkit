import $ from '@/index'

export default () => {
    it(`target(...)`, async () => {
        await $.waitFor.target('blank')
    })
    it(`response(...)`, async () => {
        await $.page.evaluate(() => {
            $Z('body').append(
                '<img src="https://img.to8to.com/to8to_pc/xiaoguotu/tumax/banner3.png?v=20181120" alt="">'
            )
        })
        await $.waitFor.response('to8to.com/')
    })
    it(`fn(...)`, async () => {
        await $.waitFor.fn(async () => {
            return true
        })
    })
}
