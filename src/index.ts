import { type PushFunction, singlePage } from '@substrate-system/single-page'
import CatchLinks from '@substrate-system/catch-links'
export type { PushFunction } from '@substrate-system/single-page'

export interface Listener {
    (href:string, data:{ scrollX:number, scrollY:number, popstate:boolean }):void;
}

export function Route (opts:{
    el?:HTMLElement;
    handleAnchor?:boolean|((href:string)=>boolean),
    handleLink?:(href:string)=>boolean
} = {}) {
    const listeners:Listener[] = []
    const el = opts.el || document?.body
    if (!el) throw new Error('Not document')

    const setRoute = singlePage((href, eventData) => {
        listeners.forEach(function (cb) {
            cb(href, eventData)
        })
    })

    CatchLinks(el, setRoute, {
        handleAnchor: opts.handleAnchor,
        handleLink: opts.handleLink
    })

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
        setRoute.push(href)
    }

    _setRoute.show = function (href) {
        setRoute.show(href)
    }

    _setRoute.page = setRoute.page

    listen.setRoute = _setRoute

    return listen
}

export default Route
