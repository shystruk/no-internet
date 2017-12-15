# no-internet #
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

Checking if the internet is accessible (not local connection only)

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

// connection is checked each 5000 milliseconds
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

Callback is called in each connection checking
