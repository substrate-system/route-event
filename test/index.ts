import { test } from '@nichoth/tapzero'
import Route from '../src/index.js'

test('route event', async t => {
    const onRoute = Route()

    onRoute((newPath, ev) => {
        t.equal(typeof newPath, 'string', 'should callback with the path')
        t.ok(ev.scrollX, 'should have scroll state')
    })
})
