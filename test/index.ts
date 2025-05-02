import { test } from '@substrate-system/tapzero'
import { dom } from '@substrate-system/dom'
import Route from '../src/index.js'

let unlisten:()=>void
let local
test('route event', async t => {
    const onRoute = Route()
    t.plan(3)

    unlisten = onRoute((newPath, ev) => {
        t.equal(newPath, '/local', 'should callback with the path')
        t.equal(typeof ev.scrollX, 'number', 'should have scroll state X')
        t.equal(typeof ev.scrollY, 'number', 'should have scroll state Y')
    })

    local = document.getElementById('local-link')
    const remote = document.getElementById('remote-link')
    dom.click(local!)
    dom.click(remote!)
})

test('stop listening', async t => {
    t.plan(1)
    unlisten()
    dom.click(local!)
    t.ok(1, 'should not callback after calling "unlisten"')
})
