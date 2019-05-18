const utils = require('../utils')
const target = require('./target')
const location = require('./location')
const qs = require('qs')

module.exports = {
    target: async (targetUrlSubstr, options) => {
        await utils.waitFor(
            async () => {
                return !!(await target.findTarget(targetUrlSubstr))
            },
            options,
            `waiting for target: ${targetUrlSubstr} but timeout (#)`
        )
    },

    location: {
        hash: async (hash, hashParams, options) => {
            await utils.waitFor(
                async () => {
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
                },
                options,
                `waiting for location hash: ${hash},  but timeout (#)`
            )
        },

        pathname: async (pathname, options) => {
            await utils.waitFor(
                async () => {
                    const lct = await location()
                    return lct.pathname === pathname
                },
                options,
                `waiting for location pathname: ${pathname} but timeout (#)`
            )
        },

        search: async (params, options) => {
            await utils.waitFor(
                async () => {
                    const lct = await location()
                    const search = lct.search
                    return Object.keys(params).every(
                        (key) => search[key] === params[key]
                    )
                },
                options,
                `waiting for location params: ${JSON.stringify(
                    params
                )} but timeout (#)`
            )
        }
    },

    request: async (pathname, params, options) => {
        await page.waitForRequest((request) => {
            const urlObj = utils.parseUrl(request.url())
            const postData = qs.parse(request.postData())
            if (pathname === urlObj.pathname) {
                if (params && Object.keys(params).length) {
                    const search = { ...urlObj.search, ...postData }
                    return Object.keys(params).every(
                        (key) => search[key] === params[key]
                    )
                } else {
                    return true
                }
            }
        }, options || { timeout: 2000 })
    },

    response: async (pathname, options) => {
        await page.waitForResponse((response) => {
            const urlObj = utils.parseUrl(response.url())
            if (pathname === urlObj.pathname && response.status() === 200) {
                return true
            }
        }, options || { timeout: 2000 })
    },

    delay: (ms) => {
        return new Promise((r, rj) => {
            setTimeout(() => {
                r()
            }, ms || 100)
        })
    },

    fn: async (cb, options) => {
        await utils.waitFor(
            async () => {
                return await cb()
            },
            options,
            `waiting for callback return true but timeout (#)`
        )
    }
}
