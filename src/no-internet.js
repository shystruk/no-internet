/*
 Copyright (c) 2017 Vasyl Stokolosa https://github.com/shystruk
 License: MIT - https://opensource.org/licenses/MIT
 https://github.com/shystruk/no-internet
 */

import SetInterval from 'set-interval';

(function(f) {
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = f();
    } else if (typeof define === 'function' && define.amd) {
        define([],f);
    } else {
        var g;

        if (typeof window !== 'undefined') {
            g = window;
        } else if(typeof global !== 'undefined') {
            g = global;
        } else if(typeof self !== 'undefined') {
            g = self;
        } else {
            g = this;
        }

        g.myModule = f();
    }
})(function() {
    const OFFLINE = true;
    const ONLINE = false;

    const defaultOptions = {
        milliseconds: 5000,
        url: '/favicon.ico'
    };

    /**
     * @param {Object} options
     * @return {Promise|*}
     */
    function noInternet(options) {
        options = options || {};
        options.milliseconds = options.milliseconds || defaultOptions.milliseconds;
        options.url = options.url || defaultOptions.url;

        if (!(!!options.callback)) {
            return new Promise(resolve => {
                _checkConnection(options.url, resolve)
            });
        }

        _initEventListeners(options.callback);

        SetInterval.start(_checkConnection.bind(null, options.url, options.callback), options.milliseconds);
    }

    noInternet.clearInterval = function () {
        SetInterval.clear();
    };

    /**
     * @param {String} url
     * @param {Function} callback
     * @private
     */
    function _checkConnection(url, callback) {
        url = _buildURL(url);

        if (navigator.onLine) {
            _sendRequest(url, callback);
        } else {
            callback(OFFLINE);
        }
    }

    /**
     * @param {Function} callback
     * @private
     */
    function _initEventListeners(callback) {
        window.addEventListener('online', () => {
            callback(ONLINE);
        });

        window.addEventListener('offline', () => {
            callback(OFFLINE);
        });
    }

    /**
     * @param {String} url
     * @param {Function} callback
     * @private
     */
    function _sendRequest(url, callback) {
        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            callback(ONLINE);
        };

        xhr.onerror = () => {
            callback(OFFLINE);
        };

        xhr.open('GET', url);
        xhr.send();
    }

    /**
     * @param {String} url
     * @return {String}
     * @private
     */
    function _buildURL(url) {
        return window.location.protocol + '//' + window.location.host + url;
    }

    return noInternet;
});
