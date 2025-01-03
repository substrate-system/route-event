import { type PushFunction, singlePage } from '@substrate-system/single-page'
import CatchLinks from '@substrate-system/catch-links'
export type { PushFunction } from '@substrate-system/single-page'

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

    const listen = function listen (cb:Listener) {
        const length = listeners.length
        listeners.push(cb)

        return function unlisten () {
            listeners.splice(length, 1)
        }
    }

    const _setRoute:PushFunction = function (href:string) {
        setRoute(href)
    }

    _setRoute.push = function (href:string):void {
        // const scroll = setRoute.page.scroll
        setRoute.push(href)

        // listeners.forEach(cb => cb(href, {
        //     popstate: opts.popstate,
        //     scrollX: (scroll && scroll[0]) || 0,
        //     scrollY: (scroll && scroll[1]) || 0
        // }))
    }

    _setRoute.show = function (href) {
        setRoute.show(href)
    }

    _setRoute.page = setRoute.page

    listen.setRoute = _setRoute

    return listen
}

export default Route
