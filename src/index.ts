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
        console.log('in here')
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

    // patch this so it calls our listeners
    listen.setRoute.push = function (href:string) {
        setRoute.push(href)
        const scroll = setRoute.page[href]
        listeners.forEach(cb => cb(
            href,
            {
                popstate: false,
                scrollX: (scroll && scroll[0]) || 0,
                scrollY: (scroll && scroll[1]) || 0,
            }
        ))
    }

    return listen
}

export default Route
