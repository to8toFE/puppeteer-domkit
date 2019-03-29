import $ from '@/index'

export default () => {
    it(`target(...)`, async () => {
        await $.expect.target('blank', true)
    })
}
