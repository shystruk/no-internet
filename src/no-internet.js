/*
 Copyright (c) Vasyl Stokolosa https://github.com/shystruk
 License: MIT - https://opensource.org/licenses/MIT
 https://github.com/shystruk/no-internet
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory(require('set-interval')) :
        typeof define === 'function' && define.amd ?
            define(['set-interval'], factory) :
            (global.myBundle = factory(global.SetInterval));
}(this, (function (SetInterval) {
    'use strict';

    SetInterval = SetInterval && SetInterval.hasOwnProperty('default')
        ? SetInterval['default']
        : SetInterval;

    var OFFLINE = true;
    var ONLINE = false;
    var defaultOptions = {
        milliseconds: 5000,
        timeout: 5000,
        url: '/favicon.ico',
        headers: { 
            'Cache-Control': 'no-cache'
        }
    };

    /**
     * @param {Object} options
     * @return {Promise|*}
     */
    function noInternet(options) {
        options = options || {};
        options.milliseconds = options.milliseconds || defaultOptions.milliseconds;
        options.timeout = options.timeout || defaultOptions.timeout;
        options.url = options.url || defaultOptions.url;
        options.headers = _extend(defaultOptions.headers, options.headers);

        if (!(!!options.callback)) {
            return new Promise(function (resolve) {
                _checkConnection(
                    options.url,
                    options.headers,
                    options.timeout,
                    resolve
                );
            });
        }

        _initEventListeners(options.callback);

        SetInterval.start(
            _checkConnection.bind(null, options.url, options.headers, options.timeout, options.callback),
            options.milliseconds,
            'checkConnection'
        );
    }

    noInternet.clearInterval = function () {
        SetInterval.clear('checkConnection');
    };

    /**
     * @param {String} url
     * @param {Object} headers
     * @param {Function} callback
     * @private
     */
    function _checkConnection(url, headers, timeout, callback) {
        url = _buildURL(url);

        if (navigator.onLine) {
            _sendRequest(url, headers, timeout, callback);
        } else {
            callback(OFFLINE);
        }
    }

    /**
     * @param {Function} callback
     * @private
     */
    function _initEventListeners(callback) {
        window.addEventListener('online', function () {
            callback(ONLINE);
        });

        window.addEventListener('offline', function () {
            callback(OFFLINE);
        });
    }

    /**
     * @param {String} url
     * @param {Object} headers
     * @param {Function} callback
     * @private
     */
    function _sendRequest(url, headers, timeout, callback) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = timeout;

        xhr.onload = function () {
            callback(ONLINE);
        };

        xhr.onerror = function () {
            callback(OFFLINE);
        };

        xhr.ontimeout = function () {
            callback(OFFLINE);
        };

        xhr.open('GET', url);

        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.send();
    }

    /**
     * @param {String} url
     * @return {String}
     * @private
     */
    function _buildURL(url) {
        if (url.indexOf('http') !== -1) {
            return url;
        }

        return window.location.protocol + '//' + window.location.host + url;
    }

    /**
     * @param {Object} target 
     * @param {Object} obj
     * @return {Object}
     * @private
     */
    function _extend(target, obj) {
        if (!obj) {
            return target
        }

        Object.keys(obj).forEach(function(key) { 
            target[key] = obj[key];
        });

        return target;
    }

    return noInternet;
})));
