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

noInternet({callback: noInternetCallback})

// Clear interval
noInternet.clearInterval()
```

## API ##
### noInternet([options]) ###

#### options ####
Type: `Object`

##### milliseconds #####
Type: `number`

Default: 5000

Connection is checked at specified intervals (in milliseconds)

##### url #####
Type: `string`

Default: `/favicon.ico`

##### callback #####
Type: `function`

Arguments: `offline` type `boolean`

Default: `undefined`

Callback is called in each connection checking
