const Domkit = require('./src/Domkit')
const VSelector = require('./src/VSelector')

module.exports = Domkit
// module.exports.__for_recorder__ = {
//     props0: VSelector.props0,
//     props1: VSelector.props1,
//     subSelectors: VSelector.selectors,
//     triggers: ['input', 'click', 'focus', 'blur'],
//     $: Object.keys(Domkit),
//     $waitFor: Object.keys(Domkit.waitFors),
//     $expect: Object.keys(Domkit.expects),
//     VSelectorProto: Object.keys(VSelector.prototype)
// }
