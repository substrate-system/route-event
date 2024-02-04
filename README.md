# route event
[![types](https://img.shields.io/npm/types/@nichoth/catch-links?style=flat-square)](README.md)
[![module](https://img.shields.io/badge/module-ESM%2FCJS-blue?style=flat-square)](README.md)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)

Simple route event for the browser. Call a function with a path whenever someone clicks a link that is local to the server.

## install

```
npm i route-event
```

### CJS
```js
var Route = require('route-event')
```

### ESM
```js
import Route from 'route-event'
```

## example
Listen for click events on `document.body`. If the event is triggered by using
the browser's back/forward button, then `{ popstate }` will be true.

```js
var route = require('route-event')()

// listen for click events on docuement.body. If the href is local to the
// server, call `onRoute`
var stopListening = route(function onRoute (path, data) {
  console.log(path)
  // '/example/path'
  console.log(data)
  // { scrollX: 0, scrollY: 0, popstate: false }
})

// change the location and call the onRoute cb
route.setRoute('/some/path')
```

Pass in an element to listen to, and handle events with a router:
```js
var route = require('route-event')({
    el: document.getElementById('app')
})
var router = require('@nichoth/routes')()

router.addRoute('/', function () {
  console.log('root')
})

route(function onChange (path) {
  var m = router.match(path)
  m.action()
})
```
