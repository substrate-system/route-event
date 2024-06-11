import { singlePage } from '@bicycle-codes/single-page'
import CatchLinks from '@bicycle-codes/catch-links'

export type { PushFunction } from '@bicycle-codes/single-page'

export interface Listener {
    (href:string, data:{ scrollX:number, scrollY:number, popstate:boolean }):void;
}

export function Route (opts:{ el?:HTMLElement } = {}) {
    const listeners:Listener[] = []
    const el = opts.el || document.body

    const setRoute = singlePage(function (href, eventData) {
        listeners.forEach(function (cb) {
            cb(href, eventData)
        })
    })

    CatchLinks(el, setRoute)

    function listen (cb:Listener) {
        const length = listeners.length
        listeners.push(cb)

        return function unlisten () {
            listeners.splice(length, 1)
        }
    }

    listen.setRoute = setRoute
    return listen
}

export default Route
