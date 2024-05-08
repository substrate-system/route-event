# route event
[![tests](https://github.com/bicycle-codes/route-event/actions/workflows/nodejs.yml/badge.svg)](https://github.com/bicycle-codes/route-event/actions/workflows/nodejs.yml)
[![types](https://img.shields.io/npm/types/route-event?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![semantic versioning](https://img.shields.io/badge/semver-2.0.0-blue?logo=semver&style=flat-square)](https://semver.org/)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Simple route event for the browser. This will handle URL changes client-side, so that navigating will not cause a page reload.

Call a function with a path whenever someone clicks a link that is local to the server. Also, use the [history API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to handle back/forward button clicks.

## install

```
npm i route-event
```

### CJS
```js
var Route = require('route-event').default
```

### ESM
```js
import Route from 'route-event'
```

## example
Listen for click events on `document.body`. If the event is triggered by using
the browser's back/forward button, then `{ popstate }` will be true.

```js
import { Route } from 'route-event'
const routeEvent = Route()  // by default listen on document.body

// listen for click events on docuement.body. If the href is local to the
// server, call `onRoute`
var stopListening = routeEvent(function onRoute (path, data) {
  console.log(path)
  // => '/example/path'
  console.log(data)
  // => { scrollX: 0, scrollY: 0, popstate: false }

  // handle scroll state like a web browser
  // (restore scroll position on back/forward)
  if (data.popstate) {
      return window.scrollTo(data.scrollX, data.scrollY)
  }

  // if this was a link click (not back button), then scroll to top
  window.scrollTo(0, 0)
})

// programmatically change the location and call the onRoute cb
routeEvent.setRoute('/some/path')

// ...sometime in the future...
// unsubscribe from route events
stopListening()
```

Pass in an element to listen to, and handle events with a router:
```js
import Route from 'route-event'
import Router from '@bicycle-codes/routes'

const router = Router()
const routeEvent = Route({
  el: document.getElementById('example')
})

router.addRoute('/', function () {
  console.log('root')
})

routeEvent(function onChange (path, ev) {
  var m = router.match(path)
  m.action()

  // handle scroll state like a web browser
  if (ev.popstate) {
      return window.scrollTo(ev.scrollX, ev.scrollY)
  }
  window.scrollTo(0, 0)
})
```

## API

### Listener
Event listeners are functions that take an `href` and an object with previous
scroll position and `popstate` -- a boolean indicating if this was a link
click or back / forward button (`true` means it was back/forward button).

```ts
interface Listener {
  (href:string, data:{
    scrollX:number,
    scrollY:number,
    popstate:boolean
  }):void;
}
```

### Route
Create an instance of the event listener. Optionally take an element to listen to. Return a function that takes a callback that will receive route events. The returned function also has a property `setRoute` that will prgrammatically change the URL and call any route listeners.

```js
import Route from 'route-event'
```

```ts
function Route (opts:{ el?:HTMLElement } = {}):{
    (cb:Listener):void;
    setRoute:ReturnType<typeof singlePage>
}
```

### setRoute
A property on the returned function so you can programmatically set the URL.

```ts
function setRoute (href:string):void
```

```js
const routeEvent = Route()
routeEvent.setRoute('/example')
```
