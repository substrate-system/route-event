import { test } from '@substrate-system/tapzero'
import { click, dom } from '@substrate-system/dom'
import Route from '../src/index.js'

let unlisten
test('route event, with root call', t => {
    t.plan(1)
    const onRoute = Route()

    return new Promise<void>((resolve) => {
        unlisten = onRoute((newPath) => {
            t.equal(newPath, '/',
                "should first call with '/' (root path)," +
                    " because we didn't pass init: false")
            unlisten()
            resolve()
        })
    })
})

test('stop listening', t => {
    t.plan(1)
    const local = document.getElementById('local-link')
    unlisten()
    dom.click(local!)
    dom.click('#root')

    t.ok(1, 'should not callback after calling "unlisten"')
})

test('Use a function to check links', t => {
    t.plan(1)
    const onRoute = Route({
        handleLink: (href) => href === '/abc'
    })

    onRoute(newPath => {
        t.ok(newPath !== 'def')
    })

    click('#def')
    click('#abc')
})
