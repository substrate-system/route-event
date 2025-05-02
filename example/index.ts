import { Route } from '../src/index.js'

const routeEvent = Route({
    handleAnchor: false
})

let count = 0

const unlisten = routeEvent(function onRoute (href) {
    count++
    document.querySelector('h1')?.focus()

    console.log('route event: ', href)
    console.log('count: ', count)
    console.log('active element? ', document.activeElement)
})

document.getElementById('unlisten')?.addEventListener('click', ev => {
    ev.preventDefault()
    unlisten()
    console.log('not listening anymore')
})

document.getElementById('setRoute')?.addEventListener('click', ev => {
    ev.preventDefault()
    routeEvent.setRoute('/bar')
})

document.getElementById('setRoute-push')?.addEventListener('click', ev => {
    ev.preventDefault()
    routeEvent.setRoute.push('/baz')
})
