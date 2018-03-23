import test from 'ava';
import mock from 'xhr-mock';
import noInternet from './src/no-internet';
import SetInterval from 'set-interval';
import browserEnv from 'browser-env';
browserEnv(['window', 'document', 'navigator', 'XMLHttpRequest']);

const URL = 'https://github.com/favicon.ico';

test.before(t => {
    mock.setup();
    mock.get(URL, function (req, res) {
        return res.status(200)
    });
});

test('module should be a function', t => {
    t.is(typeof noInternet, 'function');
});

test('one check', t => {
    return noInternet({url: URL}).then(offline => {
        t.false(offline);
    });
});

test.cb('interval checking', t => {
    const options = {
        url: URL,
        callback: noInternetCallback,
        headers: { 'Access-Control-Allow-Origin': '*' }
    };

    noInternet(options);

    function noInternetCallback(offline) {
        t.false(offline);
    }

    setTimeout(t.end);
});

test.cb('should clear interval checking', t => {
    const options = {
        url: URL,
        callback: () => {}
    };

    noInternet(options);
    noInternet.clearInterval();

    t.is(SetInterval.key['checkConnection'], void 0);

    setTimeout(t.end);
});

test('invalid URL', t => {
    return noInternet().then(offline => {
        t.true(offline);
    });
});
