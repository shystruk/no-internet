# no-internet [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?hashtags=javascript%20%23Internet%20%23connection&original_referer=https%3A%2F%2Fpublish.twitter.com%2F&ref_src=twsrc%5Etfw&text=%F0%9F%93%A1Check%20if%20the%20internet%20is%20accessible%20(not%20local%20connection%20only).%20Do%20it%20in%20interval%20or%20one%20check%20&tw_p=tweetbutton&url=https%3A%2F%2Fgithub.com%2Fshystruk%2Fno-internet&via=shystrukk) #
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php) [![codecov](https://codecov.io/gh/shystruk/no-internet/branch/master/graph/badge.svg)](https://codecov.io/gh/shystruk/no-internet) [![Build Status](https://travis-ci.org/shystruk/no-internet.svg?branch=master)](https://travis-ci.org/shystruk/no-internet) [![npm version](https://badge.fury.io/js/no-internet.svg)](https://badge.fury.io/js/no-internet)

Checking if the internet is accessible (not local connection only)

`window.navigator.onLine` is the simplest approach to return the online status of the browser. It is not guaranteed to be accurate. Most implementations of the API watch for changes in the local network interface to determine if your application is online or not. But what if your network interface is up, but your router is down ☝️. `window.navigator.onLine` will return `true` and it means that you are online and that is WRONG. To handle that case we make `XMLHttpRequest` and listen to change in the network state by events `window.ononline` and `window.onoffline` to be notified immediately 😎 

## Getting no-internet ##

#### npm
`npm install --save no-internet`

#### yarn
`yarn add no-internet --save` 

## Examples ##
```javascript
import noInternet from 'no-internet'
```

### One check ###
```javascript
noInternet().then(offline => {
    if (offline) {
        // no internet  
    }
})
```

### Interval checking ###
```javascript
function noInternetCallback(offline) {
    if (offline) {
        // no internet  
    }
}

// connection is checked and callback is called each 5000 milliseconds
noInternet({ callback: noInternetCallback })

// clear interval
noInternet.clearInterval()
```

### With options ###
```javascript
noInternet({
    milliseconds: 10000,
    timeout: 4000,
    callback: noInternetCallback,
    url: 'https://github.com/favicon.ico',
    headers: { 'Access-Control-Allow-Origin': '*' }
})
```

## API ##
### noInternet(options) ###

### options ###
Type: `Object`

#### milliseconds ####
Type: `number` <br>
Default: 5000

Connection is checked at specified intervals (in milliseconds)

#### timeout ####
Type: `number` <br>
Default: 5000

Number of milliseconds a request can take before automatically being terminated (completed).

#### url ####
Type: `string` <br>
Default: `${window.location.protocol}//${window.location.host}/favicon.ico`

HTTP request is sent to `DOMAIN/favicon.ico` for connection checking. <br>
You can specify URL with domain for e.g. `https://github.com/favicon.ico`

#### headers ####
Type: `Object` <br>
Default: `{ 'Cache-Control': 'no-cache' }`

An object of additional headers key/value pairs to send along with request

#### callback ####
Type: `function` <br>
Arguments: `offline` type `boolean` <br>
Default: `undefined`

Function that gets called in each connection checking

## Contributing

Any contributions you make **are greatly appreciated**.

Please read the [Contributions Guidelines](CONTRIBUTING.md) before submitting a PR.

## License

MIT © [Vasyl Stokolosa](https://about.me/shystruk)
