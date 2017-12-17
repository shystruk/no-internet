# no-internet #
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Checking if the internet is accessible (not local connection only)

`window.navigator.onLine` is the simplest approach to return the online status of the browser. It is not guarantee to be accurate. Most implementations of the API watch for changes in the local network interface to determine if your application is online or not. But what if your network interface is up, but your router is down ☝️. `window.navigator.onLine` will return `true` and it means that you are online and that is WRONG. To handle that case we make `XMLHttpRequest` and listen change in the network state by events `window.ononline` and `window.onoffline` to be notified immediatly 😎 

## Getting no-internet ##
`npm install no-internet`  or  `yarn add no-internet` 

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
noInternet({callback: noInternetCallback})

// clear interval
noInternet.clearInterval()
```

## API ##
### noInternet([options]) ###

#### options ####
Type: `Object`

##### milliseconds #####
Type: `number` <br>
Default: 5000

Connection is checked at specified intervals (in milliseconds)

##### url #####
Type: `string` <br>
Default: `/favicon.ico`

HTTP request is sent to `protocol//host/favicon.ico` for connection checking

##### callback #####
Type: `function` <br>
Arguments: `offline` type `boolean` <br>
Default: `undefined`

Function that gets called in each connection checking

