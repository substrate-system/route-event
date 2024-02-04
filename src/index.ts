import { singlePage } from '@nichoth/single-page'
import CatchLinks from '@nichoth/catch-links'

export interface Listener {
    (href:string, data:{ scrollX:number, scrollY:number, popstate:boolean }):void;
}

export default function Route (opts:{ el?:HTMLElement } = {}) {
    const listeners:(
        (href, data:{ scrollX, scrollY, popstate }) => void
    )[] = []
    const el = opts.el || document.body

    const setRoute = singlePage(function (href, eventData) {
        listeners.forEach(function (cb) {
            cb(href, eventData)
        })
    })

    CatchLinks(el, setRoute)

    function listen (cb:(href, data:{ scrollX, scrollY, popstate }) => void) {
        const length = listeners.length
        listeners.push(cb)

        return function unlisten () {
            listeners.splice(length, 1)
        }
    }

    listen.setRoute = setRoute
    return listen
}
