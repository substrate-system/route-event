import { test } from '@substrate-system/tapzero'
import { click, sleep } from '@substrate-system/dom'
import Route from '../src/index.js'

test('setup', () => {
    document.body.innerHTML += `
        <a id="local-link" href="/local">local link</a>
        <a id="remote-link" href="https://example.com/">remote link</a>
    `
})

test('route event, without an initial event', async t => {
    // this needs to be a separate process, because in the other test we
    // would need to create multiple Route instances on one page, which
    // means the events are wonky. Normally we get one event when the
    // page loads.
    t.plan(3)
    const onRoute = Route({ init: false })

    onRoute((newPath, ev) => {
        if (newPath === '/') t.fail('Should not call with the root path')
        t.equal(newPath, '/local', 'should callback with the path')
        t.equal(typeof ev.scrollX, 'number', 'should have scroll state X')
        t.equal(typeof ev.scrollY, 'number', 'should have scroll state Y')
    })

    const local = document.getElementById('local-link')
    const remote = document.getElementById('remote-link')
    await sleep(1)
    await click(local!)
    await click(remote!)
})
