import $ from '@/index'

// 没参数
const props0 = [
    'text',
    'html',
    'height',
    'width',
    'offset',
    'offsetParent',
    'position',
    'val',
    'index',
    'scrollTop',
    'visible',
    'exist'
]
// // 有参数
const props1 = {
    css: 'position',
    attr: 'attr',
    prop: 'nodeName',
    data: 'data',
    is: 'div',
    hasClass: 'for-ppt-test'
}

// 没时间，只好这样简单校验下
export default () => {
    props0
        .filter((item) => ['val'].indexOf(item) === -1)
        .forEach((method) => {
            it(`$selector.expect.${method}(NOT_EMPTY)`, async () => {
                await $('#for-ppt-test').expect[method]($.constants.NOT_EMPTY)
            })
        })

    Object.keys(props1).forEach((method) => {
        it(`$selector.expect.${method}(${
            props1[method]
        }, NOT_EMPTY)`, async () => {
            await $('#for-ppt-test').expect[method](
                props1[method],
                $.constants.NOT_EMPTY
            )
        })
    })
}
