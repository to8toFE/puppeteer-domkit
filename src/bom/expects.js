const target = require('./target')
const location = require('./location')

module.exports = {
    target: async (targetUrlSubstr) => {
        const res = !!(await target.findTarget(targetUrlSubstr))
        if (!res) {
            throw new Error(`expect target: ${targetUrlSubstr} but false`)
        }
    },
    location: {
        hash: async (hash, hashParams, options) => {
            const ok = (async () => {
                const lct = await location()
                if (lct.hash === hash) {
                    if (hashParams && Object.keys(hashParams).length) {
                        const search = lct.hashSearch
                        return Object.keys(hashParams).every(
                            (key) => search[key] === hashParams[key]
                        )
                    } else {
                        return true
                    }
                }
            })()
            if (!ok) {
                throw new Error(
                    `expect location hash: ${hash} ${
                        hashParams ? JSON.stringify(hashParams) : ''
                    } but false`
                )
            }
        },

        pathname: async (pathname, options) => {
            const lct = await location()
            if (lct.pathname !== pathname) {
                throw new Error(
                    `expect location pathname: ${pathname} but false`
                )
            }
        },

        search: async (params, options) => {
            const lct = await location()
            const search = lct.search
            const ok = Object.keys(params).every(
                (key) => search[key] === params[key]
            )
            if (!ok) {
                throw new Error(
                    `expect location params: ${JSON.stringify(
                        params
                    )} but false`
                )
            }
        }
    }
}
