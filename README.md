# react-fullstack-starter

-------------------
This project aims to provide basic solutions for typical web app tasks. Bundling, indexing, pagination, filtering, sorting, CRUD, forms, authorization, tests, lints, live reloads, universal app, code sharing between server and browser.

![alt tag](/tech-stack.jpg)
(Not a final screen; prototype.)

## Install

```
$ npm install; bin/install
```

## Run

Production
```
$ npm run build
$ npm run node
```

Development
```
$ npm run dev     [terminal #1]
$ npm run nodemon [terminal #2]
```

## Lint

```
$ npm run lint -s (mute node output)
```

## Test

All tests
```
$ npm test -s
```

Specific tests (`--` is an NPM syntax to pass arguments)
```
$ npm test -- --grep "api/uxEngs POST" -s
```

Refer to [Mocha](https://github.com/mochajs/mocha) and [Chai](https://github.com/chaijs/chai)
for more details.

TODO
------------------
* Update all dependencies
* Server-side React
* Add screenshots
