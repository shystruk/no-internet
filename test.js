import test from 'ava';
import noInternet from './src/no-internet';

test('module should be a function', t => {
    t.is(typeof noInternet, 'function');
});
